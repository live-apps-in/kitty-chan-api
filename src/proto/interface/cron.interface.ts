import { Observable } from 'rxjs';

export interface ICronGRPCService {
  cronCreate(request: ICronCreateGRPC): Observable<void>;
}

interface ICronCreateGRPC {
  id: string;
  expression: string;
}
