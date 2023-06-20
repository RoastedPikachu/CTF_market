import axios from 'axios';
import {ref} from "vue";

export default function() {
    let api = axios.create();

    const errorMess = ref('');

    const initAPI = (isPost) => {
        api.interceptors.request.use(config => {
            return config;
        }, error => {
            console.log(`Ошибка на клиентской стороне: ${error.message}`);
        })

        api.interceptors.response.use(response => {
            return response;
        }, error => {
            const parseErrorNumberRegex = /\d+/g;

            error = +error.message.match(parseErrorNumberRegex);

            switch(error[0]) {
                case 404:
                    errorMess.value = 'Пользователя с такой почтой несуществует';
                    break;

                case 412:
                    errorMess.value = 'Неверный пароль';
                    break;
            }
        })

        isPost ? api = axios.create({method: 'POST'}) : false;
    }

    return {
        api,
        errorMess,
        initAPI
    }
}