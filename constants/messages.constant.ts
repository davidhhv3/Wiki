enum responseCodes {
  'SWM-000',
  'SWM-001',
  'SWM-002',
  'SWM-003',
  'SWM-004',
  'SWM-005',
  'SWM-006',
  'SWM-007',
  'SWM-008',
  'SWM-009',
  'SWM-010',
  'SWM-011',
  'SWM-016',
  'SWM-020',
  'SWM-021',
  'SWM-022',
  'SWM-023',
  'SWM-024',
  'SWM-025',
  'SWM-026',
  'SWM-027',
  'SWM-028',
  'SWM-029',
  'SWM-030',
  'SWM-031',
  'SWM-032',
  'SWM-033',
  'SWM-034',
}

type ResponseCodes = keyof typeof responseCodes;

export interface ResponseMessage {
  code: ResponseCodes;
  message: string;
  data?: any;
  token?: string;
}

export const CUSTOM_RES = ({
  code = 'SWM-000',
  message = 'Operación exitosa',
  token,
  data,
}: Partial<ResponseMessage>): ResponseMessage => ({
  code,
  message,
  token,
  data,
});

export const SEQUELIZE_ERROR = ({
  singleName,
  pluralName,
}: {
  singleName?: string;
  pluralName?: string;
}): Record<string, ResponseMessage> => ({
  CREATE: {
    code: 'SWM-001',
    message: `No se pudo crear ${singleName}`,
  },
  CREATE_MANY: {
    code: 'SWM-001',
    message: `No se pudo crear ${pluralName}`,
  },
  FIND_ALL: {
    code: 'SWM-002',
    message: `No se pudo encontrar ${pluralName}`,
  },
  FIND_PAGINATED: {
    code: 'SWM-002',
    message: `No se pudo listar ${pluralName}`,
  },
  FIND_ONE: {
    code: 'SWM-003',
    message: `No se pudo encontrar ${singleName}`,
  },
  UPDATE: {
    code: 'SWM-004',
    message: `No se pudo actualizar ${singleName}`,
  },
  DELETE: {
    code: 'SWM-005',
    message: `No se pudo eliminar ${singleName}`,
  },
  RESTORE: {
    code: 'SWM-006',
    message: `No se pudo restaurar ${singleName}`,
  },
  TRANSACTION: {
    code: 'SWM-007',
    message: `No se pudo ejecutar la transacción para ${singleName}`,
  },
  ALREADY_EXISTS: {
    code: 'SWM-007',
    message: `Ya existe ${singleName}`,
  },
});

export const ROOT_USER: Record<string, ResponseMessage> = {
  CREATED: {
    code: 'SWM-010',
    message: 'El usuario root se creó correctamente',
  },
  ALREADY_EXISTS: {
    code: 'SWM-011',
    message: 'El usuario root ya existe',
  },
};

export const AUTH: Record<string, ResponseMessage> = {
  LOGIN: {
    code: 'SWM-020',
    message: 'Inicio de sesión exitoso',
  },
  FAILED: {
    code: 'SWM-021',
    message: 'Inicio de sesión fallido, valida tus credenciales',
  },
  UNAUTHORIZED: {
    code: 'SWM-022',
    message: 'No autorizado',
  },
  FORBIDDEN: {
    code: 'SWM-023',
    message: 'Acceso denegado',
  },
  FORBIDDEN_COMPANY_PERMISSIONS: {
    code: 'SWM-023',
    message: 'Acceso denegado, no tienes permisos para acceder a este recurso',
  },
  SESSION_EXPIRED: {
    code: 'SWM-024',
    message: 'Sesión expirada',
  },
  SESSION_MAX_ATTEMPTS_REACHED: {
    code: 'SWM-024',
    message: 'Haz superado el limite de reintentos',
  },
  INVALID_CODE: {
    code: 'SWM-021',
    message: 'Código de verificación incorrecto',
  },
  ALREADY_EXISTS: {
    code: 'SWM-024',
    message: 'Ya existe una sesión para este método',
  },
  TWO_FACTOR_REQUIRED: {
    code: 'SWM-025',
    message: 'Verificación 2FA requerida',
  },
  TWO_FACTOR_INVALID: {
    code: 'SWM-026',
    message: 'Verificación 2FA inválida o expirada',
  },
  USER_INACTIVE: {
    code: 'SWM-021',
    message: 'Usuario inactivo',
  },
  EMAIL_VERIFICATION: {
    code: 'SWM-027',
    message: 'Correo de confirmación enviado',
  },
  EMAIL_VERIFICATION_REQUIRED: {
    code: 'SWM-027',
    message: 'Primero verifica tu email',
  },
  PASSWORD_MISMATCH: {
    code: 'SWM-028',
    message: 'Las contraseñas no coinciden',
  },
  PASSWORD_SAME_AS_CURRENT: {
    code: 'SWM-028',
    message: 'La nueva contraseña debe ser diferente a la actual',
  },
};

export const JWT: Record<string, ResponseMessage> = {
  EXPIRED: {
    code: 'SWM-008',
    message: 'Token expirado o invalido',
  },
  FAILED: {
    code: 'SWM-009',
    message: 'Error al generar el token',
  },
  VALIDATION: {
    code: 'SWM-009',
    message: 'Error al validar el token',
  },
};

export const NO_CONFIGURATIONS: ResponseMessage = {
  code: 'SWM-016',
  message: 'No hay configuraciones',
};
