import { HttpException, HttpStatus } from '@nestjs/common';

const handleError = (error) => {
  if (error.message.includes('event already finished')) {
    throw new HttpException(
      {
        status: 403,
        message: 'Evento já finalizado.',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
  if (error.message.includes('event already scheduled')) {
    throw new HttpException(
      {
        status: 403,
        message: 'Evento já agendado.',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
  if (error.message.includes('event already starded')) {
    throw new HttpException(
      {
        status: 403,
        message: 'Não é possível agendar evento iniciado.',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
  if (error) {
    throw new HttpException(
      {
        status: 500,
        message: error,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
};

export default handleError;
