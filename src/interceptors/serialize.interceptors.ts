import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { classToPlain, plainToClass } from 'class-transformer';
import { UserDto } from 'src/users/dtos/user-dto';

export class SerializeInterceptor implements NestInterceptor{
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    //console.log('Im running before the handler', context);
    //SE Quiser que algo aconteça antes do handler, incluir aqui

    return next.handle().pipe(
      map((data: any) => {
        //console.log('Im running before response is sent out', data);
        return plainToClass(UserDto, data, {
          //esse atributo especifica que apenas os atributos da entidade que estiverem com Expose irão aparecer
          excludeExtraneousValues: true,
        })
      })
    )
  }

}