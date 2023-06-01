### Flujo

1. Generar un link de pago por Evento/Usuario.
    ```javascript
    const result = mercadopago.preferences.create();
    result.data.init_point // url para redireccionar el usuario al pago en Mercadopago
    ```
    
2. 