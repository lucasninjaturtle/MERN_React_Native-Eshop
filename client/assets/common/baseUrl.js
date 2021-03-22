import {Platform} from 'react-native'

let baseURL = '';

{Platform.OS == 'android' ? baseURL = 'exp://192.168.0.13:3005/api/v1/' :

bseUrl = 'exp://192.168.0.13:3005/api/v1/'

}


console.log(baseURL)

export default baseURL;