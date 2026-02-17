/**
 * Validaciones del formulario de contacto - Wiki Los Aventureros
 * v2.0 - Validaciones robustas con restricción en tiempo real
 */
document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    const form = document.getElementById('contactForm');
    if (!form) return; // Solo ejecutar en la página de contacto

    // ========================================
    // Referencias a los campos del formulario
    // ========================================
    const nombreInput = document.getElementById('nombreCompleto');
    const emailInput = document.getElementById('correoElectronico');
    const telefonoInput = document.getElementById('telefono');
    const asuntoSelect = document.getElementById('asunto');
    const mensajeInput = document.getElementById('mensaje');
    const mensajeCounter = document.getElementById('mensaje-counter');

    // ========================================
    // Helpers: Mostrar / Limpiar errores
    // ========================================
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        if (!formGroup) return false;
        const errorDisplay = formGroup.querySelector('.error-message');
        input.classList.add('error');
        if (errorDisplay) {
            errorDisplay.innerText = message;
            errorDisplay.style.display = 'block';
        }
        return false;
    }

    function clearError(input) {
        const formGroup = input.closest('.form-group');
        if (!formGroup) return true;
        const errorDisplay = formGroup.querySelector('.error-message');
        input.classList.remove('error');
        if (errorDisplay) {
            errorDisplay.style.display = 'none';
        }
        return true;
    }

    // ========================================
    // Funciones de validación individuales
    // ========================================

    function validateNombre() {
        const value = nombreInput.value.trim();
        if (value.length === 0) {
            return showError(nombreInput, 'El nombre completo es obligatorio.');
        }
        if (value.length < 3) {
            return showError(nombreInput, 'El nombre debe tener al menos 3 caracteres.');
        }
        if (value.length > 100) {
            return showError(nombreInput, 'El nombre no puede exceder 100 caracteres.');
        }
        // Solo letras, espacios y tildes
        const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
        if (!nameRegex.test(value)) {
            return showError(nombreInput, 'El nombre solo puede contener letras y espacios.');
        }
        return clearError(nombreInput);
    }

    function validateEmail() {
        const value = emailInput.value.trim();
        if (value.length === 0) {
            return showError(emailInput, 'El correo electrónico es obligatorio.');
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value)) {
            return showError(emailInput, 'Ingrese un correo válido (ej: usuario@dominio.com).');
        }
        return clearError(emailInput);
    }

    function validateTelefono() {
        const value = telefonoInput.value.trim();
        if (value.length === 0) {
            return showError(telefonoInput, 'El teléfono es obligatorio.');
        }
        // Solo dígitos numéricos
        if (!/^\d+$/.test(value)) {
            return showError(telefonoInput, 'El teléfono solo puede contener números.');
        }
        if (value.length < 7 || value.length > 15) {
            return showError(telefonoInput, 'El teléfono debe tener entre 7 y 15 dígitos.');
        }
        return clearError(telefonoInput);
    }

    function validateAsunto() {
        if (!asuntoSelect.value || asuntoSelect.value === '') {
            return showError(asuntoSelect, 'Por favor seleccione un motivo de contacto.');
        }
        return clearError(asuntoSelect);
    }

    function validateMensaje() {
        const value = mensajeInput.value;
        if (value.length === 0) {
            return showError(mensajeInput, 'El mensaje es obligatorio.');
        }
        if (value.length < 20) {
            return showError(mensajeInput, 'El mensaje debe tener al menos 20 caracteres.');
        }
        if (value.length > 400) {
            return showError(mensajeInput, 'El mensaje no puede exceder 400 caracteres.');
        }
        return clearError(mensajeInput);
    }

    // ========================================
    // RESTRICCIÓN EN TIEMPO REAL: Teléfono
    // Bloquea cualquier carácter que no sea número
    // ========================================
    if (telefonoInput) {
        // Prevenir teclas no numéricas
        telefonoInput.addEventListener('keypress', function (e) {
            const char = String.fromCharCode(e.which || e.keyCode);
            if (!/\d/.test(char)) {
                e.preventDefault();
            }
        });

        // Filtrar pegado de texto no numérico
        telefonoInput.addEventListener('paste', function (e) {
            e.preventDefault();
            const pastedText = (e.clipboardData || window.clipboardData).getData('text');
            const numericOnly = pastedText.replace(/\D/g, '');
            // Insertar solo los caracteres numéricos
            const start = this.selectionStart;
            const end = this.selectionEnd;
            const currentValue = this.value;
            this.value = currentValue.substring(0, start) + numericOnly + currentValue.substring(end);
            this.setSelectionRange(start + numericOnly.length, start + numericOnly.length);
        });

        // Limpiar si se ingresa texto no numérico por otro medio (autocomplete, etc.)
        telefonoInput.addEventListener('input', function () {
            this.value = this.value.replace(/\D/g, '');
            // Limitar a 15 dígitos
            if (this.value.length > 15) {
                this.value = this.value.substring(0, 15);
            }
        });
    }

    // ========================================
    // RESTRICCIÓN EN TIEMPO REAL: Nombre
    // Bloquea números y caracteres especiales
    // ========================================
    if (nombreInput) {
        nombreInput.addEventListener('keypress', function (e) {
            const char = String.fromCharCode(e.which || e.keyCode);
            // Permitir solo letras, espacios y tildes
            if (!/[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/.test(char)) {
                e.preventDefault();
            }
        });

        nombreInput.addEventListener('paste', function (e) {
            e.preventDefault();
            const pastedText = (e.clipboardData || window.clipboardData).getData('text');
            const cleanText = pastedText.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g, '');
            const start = this.selectionStart;
            const end = this.selectionEnd;
            const currentValue = this.value;
            this.value = currentValue.substring(0, start) + cleanText + currentValue.substring(end);
            this.setSelectionRange(start + cleanText.length, start + cleanText.length);
        });
    }

    // ========================================
    // RESTRICCIÓN EN TIEMPO REAL: Mensaje
    // Limitar a 400 caracteres
    // ========================================
    if (mensajeInput) {
        mensajeInput.addEventListener('input', function () {
            if (this.value.length > 400) {
                this.value = this.value.substring(0, 400);
            }
        });
    }

    // ========================================
    // Contador de caracteres del mensaje
    // ========================================
    if (mensajeInput && mensajeCounter) {
        mensajeInput.addEventListener('input', function () {
            const currentLength = this.value.length;
            const remaining = 400 - currentLength;
            const needed = 20 - currentLength;

            if (currentLength < 20) {
                mensajeCounter.innerText = 'Faltan ' + needed + ' caracteres para el mínimo (20). Restantes: ' + remaining;
                mensajeCounter.className = 'char-counter limit-error';
            } else if (remaining <= 50) {
                mensajeCounter.innerText = 'Caracteres restantes: ' + remaining;
                mensajeCounter.className = 'char-counter limit-warning';
            } else {
                mensajeCounter.innerText = 'Caracteres restantes: ' + remaining;
                mensajeCounter.className = 'char-counter';
            }
        });
    }

    // ========================================
    // Validación en tiempo real (al salir del campo)
    // ========================================
    if (nombreInput) nombreInput.addEventListener('blur', validateNombre);
    if (emailInput) emailInput.addEventListener('blur', validateEmail);
    if (telefonoInput) telefonoInput.addEventListener('blur', validateTelefono);
    if (asuntoSelect) asuntoSelect.addEventListener('blur', validateAsunto);
    if (asuntoSelect) asuntoSelect.addEventListener('change', validateAsunto);
    if (mensajeInput) mensajeInput.addEventListener('blur', validateMensaje);

    // ========================================
    // Validación al enviar el formulario
    // ========================================
    form.addEventListener('submit', function (event) {
        // Siempre prevenir el envío primero, solo enviar si todo es válido
        event.preventDefault();

        const isNombreValid = validateNombre();
        const isEmailValid = validateEmail();
        const isTelefonoValid = validateTelefono();
        const isAsuntoValid = validateAsunto();
        const isMensajeValid = validateMensaje();

        const allValid = isNombreValid && isEmailValid && isTelefonoValid && isAsuntoValid && isMensajeValid;

        if (allValid) {
            // Todo es válido, enviar el formulario
            form.submit();
        } else {
            // Hacer scroll al primer campo con error
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
        }
    });
});
