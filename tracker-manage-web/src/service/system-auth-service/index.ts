import { serviceHelper } from '@/service/helper';
import { LoginInfo } from '@/service/system-auth-service/types';

export const systemAuthService = {

  login: serviceHelper.define<boolean, LoginInfo>({
    url: '/system-auth/login',
    method: 'post'
  })
}
