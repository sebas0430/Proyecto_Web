document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');

    if (!form) return; // Only run on contact page

    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const telefonoInput = document.getElementById('telefono');
    const asuntoSelect = document.getElementById('asunto');
    const mensajeInput = document.getElementById('mensaje');
    const mensajeCounter = document.getElementById('mensaje-counter');

    // Helper: Show Error
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorDisplay = formGroup.querySelector('.error-message');
        input.classList.add('error');
        errorDisplay.innerText = message;
        errorDisplay.style.display = 'block';
        return false;
    }

    // Helper: Clear Error
    function clearError(input) {
        const formGroup = input.parentElement;
        const errorDisplay = formGroup.querySelector('.error-message');
        input.classList.remove('error');
        errorDisplay.style.display = 'none';
        return true;
    }

    // Real-time Message Counter
    mensajeInput.addEventListener('input', function () {
        const currentLength = this.value.length;
        const remaining = 400 - currentLength;
        const needed = 20 - currentLength;

        // Update Text
        if (currentLength < 20) {
            mensajeCounter.innerText = `Faltan ${needed} caracteres para el mínimo (20). Restantes: ${remaining}`;
            mensajeCounter.className = 'char-counter limit-error';
        } else if (currentLength > 400) {
            mensajeCounter.innerText = `Excedido por ${Math.abs(remaining)} caracteres.`;
            mensajeCounter.className = 'char-counter limit-error';
        } else {
            mensajeCounter.innerText = `Caracteres restantes: ${remaining}`;
            mensajeCounter.className = 'char-counter';
        }
    });

    form.addEventListener('submit', function (event) {
        let valid = true;

        // 1. Nombre: Mínimo 3 caracteres, no vacíos
        if (nombreInput.value.trim().length < 3) {
            valid = showError(nombreInput, 'El nombre debe tener al menos 3 caracteres.');
        } else {
            clearError(nombreInput);
        }

        // 2. Email: Regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            valid = showError(emailInput, 'Ingrese un correo electrónico válido (ej: usuario@dominio.com).');
        } else {
            clearError(emailInput);
        }

        // 3. Telefono: Numeros, 7-15
        const phoneRegex = /^\d{7,15}$/;
        if (!phoneRegex.test(telefonoInput.value.trim())) {
            valid = showError(telefonoInput, 'El teléfono debe contener solo números (7-15 dígitos).');
        } else {
            clearError(telefonoInput);
        }

        // 4. Asunto: No default
        if (asuntoSelect.value === "" || asuntoSelect.value === "Seleccione una opción") {
            valid = showError(asuntoSelect, 'Por favor seleccione un motivo de contacto.');
        } else {
            clearError(asuntoSelect);
        }

        // 5. Mensaje: 20-400 chars
        const msgLen = mensajeInput.value.length;
        if (msgLen < 20 || msgLen > 400) {
            valid = showError(mensajeInput, 'El mensaje debe tener entre 20 y 400 caracteres.');
        } else {
            clearError(mensajeInput);
        }

        if (!valid) {
            event.preventDefault(); // Stop submission
        }
        // If valid, form submits naturally to backend
    });
});
