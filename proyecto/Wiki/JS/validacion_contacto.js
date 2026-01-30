/* Script de Validación de Formulario de Contacto 
   Cumple con los requisitos de validación manual en JS
*/

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const mensajeInput = document.getElementById('mensaje');
    const charCountSpan = document.getElementById('charCount');
    const charsNeededSpan = document.getElementById('charsNeeded');
    const feedbackDiv = document.getElementById('form-feedback');

    // Contador de caracteres en tiempo real
    mensajeInput.addEventListener('input', () => {
        const currentLength = mensajeInput.value.length;
        charCountSpan.textContent = currentLength;

        if (currentLength < 20) {
            charsNeededSpan.style.display = 'inline';
            charsNeededSpan.textContent = `(Faltan ${20 - currentLength} caracteres)`;
        } else if (currentLength > 400) {
            charsNeededSpan.style.display = 'inline';
            charsNeededSpan.textContent = `(Excede por ${currentLength - 400} caracteres)`;
            charCountSpan.style.color = 'red';
        } else {
            charsNeededSpan.style.display = 'none';
            charCountSpan.style.color = 'inherit';
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevenir envío por defecto

        // Limpiar errores previos
        clearErrors();
        feedbackDiv.style.display = 'none';

        let isValid = true;

        // --- 1. Validar Nombre Completo ---
        const nombre = document.getElementById('nombre');
        const nombreValue = nombre.value.trim();
        if (nombreValue.length === 0) {
            showError('nombre', 'El nombre es obligatorio.');
            isValid = false;
        } else if (nombreValue.length < 3) {
            showError('nombre', 'El nombre debe tener al menos 3 caracteres.');
            isValid = false;
        }

        // --- 2. Validar Correo Electrónico ---
        const email = document.getElementById('email');
        const emailValue = email.value.trim();
        // Regex simple para validar @ y punto después
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailValue.length === 0) {
            showError('email', 'El correo electrónico es obligatorio.');
            isValid = false;
        } else if (!emailRegex.test(emailValue)) {
            showError('email', 'Ingrese un correo válido (debe contener @ y un punto).');
            isValid = false;
        }

        // --- 3. Validar Teléfono ---
        const telefono = document.getElementById('telefono');
        const telefonoValue = telefono.value.trim();
        const telefonoRegex = /^[0-9]+$/; // Solo números

        if (telefonoValue.length === 0) {
            showError('telefono', 'El teléfono es obligatorio.');
            isValid = false;
        } else if (!telefonoRegex.test(telefonoValue)) {
            showError('telefono', 'El teléfono solo debe contener números.');
            isValid = false;
        } else if (telefonoValue.length < 7 || telefonoValue.length > 15) {
            showError('telefono', 'El teléfono debe tener entre 7 y 15 dígitos.');
            isValid = false;
        }

        // --- 4. Validar Asunto ---
        const asunto = document.getElementById('asunto');
        if (asunto.value === "") {
            showError('asunto', 'Por favor seleccione un asunto.');
            isValid = false;
        }

        // --- 5. Validar Mensaje ---
        const mensajeValue = mensajeInput.value.trim();
        if (mensajeValue.length === 0) {
            showError('mensaje', 'El mensaje es obligatorio.');
            isValid = false;
        } else if (mensajeValue.length < 20) {
            showError('mensaje', `El mensaje es muy corto. Faltan ${20 - mensajeValue.length} caracteres.`);
            isValid = false;
        } else if (mensajeValue.length > 400) {
            showError('mensaje', `El mensaje es muy largo. Elimine ${mensajeValue.length - 400} caracteres.`);
            isValid = false;
        }

        // --- Resultado Final ---
        if (isValid) {
            // Mostrar éxito
            feedbackDiv.className = 'form-feedback success';
            feedbackDiv.textContent = '¡Formulario válido! Información lista para enviar.';
            feedbackDiv.style.display = 'block';

            // Opcional: Resetear formulario
            // form.reset(); 
        } else {
            feedbackDiv.className = 'form-feedback error';
            feedbackDiv.textContent = 'Por favor corrija los errores marcados arriba.';
            feedbackDiv.style.display = 'block';
        }
    });

    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorSpan = document.getElementById(`error-${fieldId}`);

        if (field && errorSpan) {
            field.classList.add('input-error');
            errorSpan.textContent = message;
            errorSpan.style.display = 'block';
        }
    }

    function clearErrors() {
        // Quitar clases de error y ocultar mensajes
        const inputs = document.querySelectorAll('.input-error');
        inputs.forEach(input => input.classList.remove('input-error'));

        const errorSpans = document.querySelectorAll('.error-msg');
        errorSpans.forEach(span => {
            span.textContent = '';
            span.style.display = 'none';
        });
    }
});
