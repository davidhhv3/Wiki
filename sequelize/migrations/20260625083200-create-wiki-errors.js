'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.sequelize.query(
        'CREATE EXTENSION IF NOT EXISTS pgcrypto;',
        { transaction },
      );

      await queryInterface.createTable(
        'wiki_errors',
        {
          id: {
            type: Sequelize.STRING(255),
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.literal('gen_random_uuid()::text'),
          },
          code: {
            type: Sequelize.STRING(20),
            allowNull: false,
            unique: true,
          },
          name: {
            type: Sequelize.STRING(100),
            allowNull: false,
          },
          category_id: {
            type: Sequelize.STRING(255),
            allowNull: false,
            references: {
              model: 'categories',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
          severity: {
            type: Sequelize.ENUM('Baja', 'Media', 'Alta', 'Crítica'),
            allowNull: false,
          },
          description: {
            type: Sequelize.TEXT,
            allowNull: false,
          },
          symptoms: {
            type: Sequelize.ARRAY(Sequelize.STRING(255)),
            allowNull: true,
            defaultValue: Sequelize.literal('ARRAY[]::VARCHAR(255)[]'),
          },
          possible_causes: {
            type: Sequelize.ARRAY(Sequelize.STRING(255)),
            allowNull: true,
            defaultValue: Sequelize.literal('ARRAY[]::VARCHAR(255)[]'),
          },
          evidence: {
            type: Sequelize.JSONB,
            allowNull: true,
            defaultValue: Sequelize.literal(
              '\'{"images":[],"logs":[]}\'::jsonb',
            ),
          },
          solution: {
            type: Sequelize.ARRAY(Sequelize.STRING(255)),
            allowNull: true,
            defaultValue: Sequelize.literal('ARRAY[]::VARCHAR(255)[]'),
          },
          escalation: {
            type: Sequelize.ENUM(
              'backend',
              'frontend',
              'devops',
              'security_officer',
            ),
            allowNull: true,
          },
          related_docs: {
            type: Sequelize.ARRAY(Sequelize.TEXT),
            allowNull: true,
            defaultValue: Sequelize.literal('ARRAY[]::TEXT[]'),
          },
          keywords: {
            type: Sequelize.ARRAY(Sequelize.STRING(50)),
            allowNull: true,
            defaultValue: Sequelize.literal('ARRAY[]::VARCHAR(50)[]'),
          },
          created_at: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updated_at: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          deleted_at: {
            type: Sequelize.DATE,
            allowNull: true,
          },
        },
        { transaction },
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable('wiki_errors', { transaction });
      await queryInterface.sequelize.query(
        'DROP TYPE IF EXISTS "enum_wiki_errors_severity";',
        { transaction },
      );
      await queryInterface.sequelize.query(
        'DROP TYPE IF EXISTS "enum_wiki_errors_escalation";',
        { transaction },
      );
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
