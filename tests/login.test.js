import http from 'k6/http'
import { sleep, check } from 'k6'

export const options = {    //configuracoes de como o teste vai ser
    vus: 10,
    duration: '30s',
    thresholds: {
        http_req_duration: ['p(90)<3000', 'max<5000'],
        http_req_failed: ['rate<0.01']
    }
}

export default function () {    //aqui será descrito o teste realmente
    const url = 'http://localhost:3000/login';
    const payload = JSON.stringify({
        username: "julio.lima",
        senha: "123456"
    })

    const params = {
        headers: {
        'Content-Type': 'application/json',
        },
    }

    const res = http.post(url, payload, params)

    check(res, {
        'Validar que o status é 200': (r) => r.status === 200,
        'Validar que o token é string': (r) => typeof(r.json().token) == 'string' 
    })

    sleep(1)    //serve para representar uma pausa entre uma requisicao e outra, que e o que ocorre no dia a dia, o usuario pensa antes de realizar a proxima requisicao
}