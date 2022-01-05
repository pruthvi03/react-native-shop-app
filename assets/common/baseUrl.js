import { Platform } from 'react-native'


let baseURL = '';

{Platform.OS == 'android'
? baseURL = '**backend/api/v1/'
: baseURL = '**backend/api/v1/'
}

export default baseURL;