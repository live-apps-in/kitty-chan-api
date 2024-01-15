import { Observable } from 'rxjs';

export interface ICronGRPCService {
  cronCreate(request: ICronCreateGRPC): Observable<void>;
  cronUpdate(request: ICronCreateGRPC): Observable<void>;
  cronDelete(request: ICronCreateGRPC): Observable<void>;
}

export interface ICronCreateGRPC {
  id?: string;
  expression?: string;
}
