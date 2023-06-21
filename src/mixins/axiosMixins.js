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
            console.log(`Ошибка на серверной стороне: ${error.message}`);

            const parseErrorNumberRegex = /\d+/g;

            error = +error.message.match(parseErrorNumberRegex);

            switch(error) {
                case 404:
                    errorMess.value = 'Пользователь по такому токену не найден';
                    break;

                case 405:
                    errorMess.value = 'Пользователя с такой почтой несуществует';
                    break;

                case 409:
                    errorMess.value = 'Пользователь с таким токеном уже существует';
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