import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

//this was made to force the code to serialize one kind of class object in class controller and don't accept any as a type
interface ClassConstructor {
  new (...args: any[]) :{}
}

export function Serialize(dto: ClassConstructor){
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor{
constructor(private dto: any){

}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    //console.log('Im running before the handler', context);
    //SE Quiser que algo aconteça antes do handler, incluir aqui

    return next.handle().pipe(
      map((data: any) => {
        //console.log('Im running before response is sent out', data);
        return plainToClass(this.dto, data, {
          //esse atributo especifica que apenas os atributos da entidade que estiverem com Expose irão aparecer
          excludeExtraneousValues: true,
        })
      })
    )
  }

}