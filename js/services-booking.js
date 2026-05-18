document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    const serviceCards = document.querySelectorAll('.service-card');
    const detailsPanel = document.getElementById('service-details-panel');
    const selectedServiceName = document.getElementById('selected-service-name');
    const selectedServiceDetails = document.getElementById('selected-service-details');
    const bookingForm = document.getElementById('booking-form');
    const serviceSelect = document.getElementById('serviceSelect');
    const bookingDate = document.getElementById('booking-date');
    const bookingTime = document.getElementById('booking-time');
    const phoneNumber = '601169566961';

    if (!detailsPanel || !selectedServiceName || !selectedServiceDetails || !bookingForm || !serviceSelect || !bookingDate || !bookingTime) {
        return;
    }

    const today = new Date().toISOString().split('T')[0];
    bookingDate.setAttribute('min', today);
    const serviceDetailsMap = new Map();

    const setActiveCard = (selectedService) => {
        serviceCards.forEach((card) => {
            card.classList.remove('ring-2', 'ring-blue-300', 'border-blue-200');
            if (card.dataset.service === selectedService) {
                card.classList.add('ring-2', 'ring-blue-300', 'border-blue-200');
            }
        });
    };

    const updateSelectedService = (serviceName) => {
        const details = serviceDetailsMap.get(serviceName) || '';
        if (serviceName) {
            selectedServiceName.textContent = serviceName;
            selectedServiceDetails.textContent = details;
            setActiveCard(serviceName);
            return;
        }

        selectedServiceName.textContent = 'Choose a service to continue';
        selectedServiceDetails.textContent = 'Select a service, date, and time, then continue to WhatsApp to confirm your booking.';
        setActiveCard('');
    };

    const sendBookingToWhatsApp = () => {
        const service = serviceSelect.value;
        const date = bookingDate.value;
        const time = bookingTime.value;

        if (!service || !date || !time) {
            alert('Please select service, date, and time before booking.');
            return;
        }

        const message = `Hello! I would like to book a home maintenance service.

📋 *Booking Details:*
• *Service:* ${service}
• *Date:* ${date}
• *Time:* ${time}

Please confirm if this slot is available. Thank you!`;

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    };

    serviceCards.forEach((card) => {
        const service = card.dataset.service;
        const details = card.dataset.details;
        if (service && details) {
            serviceDetailsMap.set(service, details);
        }

        card.addEventListener('click', () => {
            serviceSelect.value = service || '';
            updateSelectedService(serviceSelect.value);
        });

        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                serviceSelect.value = service || '';
                updateSelectedService(serviceSelect.value);
            }
        });
    });

    serviceSelect.addEventListener('change', () => {
        updateSelectedService(serviceSelect.value);
    });

    bookingForm.addEventListener('submit', (event) => {
        event.preventDefault();
        sendBookingToWhatsApp();
    });
});
