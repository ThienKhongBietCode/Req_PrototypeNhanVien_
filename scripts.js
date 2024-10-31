
function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
    section.classList.remove('active');
});
    document.getElementById(sectionId).classList.add('active');
}

function openAppointmentForm(petName = '', serviceType = '', appointmentDate = '', appointmentTime = '') {
            document.getElementById('formTitle').innerText = petName ? 'Sửa Lịch Hẹn' : 'Thêm Lịch Hẹn';
            document.getElementById('petNameAppointment').value = petName;
            document.getElementById('serviceTypeAppointment').value = serviceType;
            document.getElementById('appointmentDate').value = appointmentDate;
            document.getElementById('appointmentTime').value = appointmentTime;
            document.getElementById('appointmentForm').classList.remove('hidden');
        }

function closeAppointmentForm() {
            document.getElementById('appointmentForm').classList.add('hidden');
        }

function saveAppointment() {
            // Logic lưu lịch hẹn
            closeAppointmentForm();
        }

        let rooms = [
            { name: 'Phòng 101', status: 'Trống', services: [] },
            { name: 'Phòng 102', status: 'Đã đặt', services: ['Tắm + Cắt tỉa'] }
        ];
        
        function addRoom() {
            document.getElementById('roomFormTitle').innerText = 'Thêm Phòng Mới';
            document.getElementById('roomName').value = '';
            document.getElementById('petName').value = '';
            document.getElementById('roomServices').value = '';
            document.getElementById('roomStatus').value = 'Trống'; // Default to Trống
            document.getElementById('roomForm').classList.remove('hidden');
        }
        
        function openRoomForm(roomName) {
            const room = rooms.find(r => r.name === roomName);
            document.getElementById('roomFormTitle').innerText = 'Thiết Lập Phòng';
            document.getElementById('roomName').value = room.name;
            document.getElementById('petName').value = ''; // Optionally load pet name if needed
            document.getElementById('roomServices').value = room.services.join(', '); // Optional
            document.getElementById('roomStatus').value = room.status;
            document.getElementById('roomForm').classList.remove('hidden');
        }
        
        function saveRoom() {
            const roomName = document.getElementById('roomName').value.trim();
            const petName = document.getElementById('petName').value.trim();
            const roomServices = document.getElementById('roomServices').value;
            const roomStatus = document.getElementById('roomStatus').value;
        
            if (!roomName || !petName || !roomServices || !roomStatus) {
                alert('Vui lòng điền đầy đủ thông tin phòng.');
                return;
            }
        
            const existingRoom = rooms.find(r => r.name === roomName);
            if (existingRoom) {
                // Cập nhật thông tin phòng
                existingRoom.status = roomStatus;
                existingRoom.services = roomServices ? roomServices.split(', ') : [];
            } else {
                // Thêm phòng mới
                rooms.push({ name: roomName, status: roomStatus, services: roomServices.split(', ') });
            }
        
            renderRoomList();
            closeRoomForm();
        }
        
        function deleteRoom(roomName) {
            const confirmDelete = confirm(`Bạn có chắc chắn muốn xóa ${roomName}?`);
            if (confirmDelete) {
                rooms = rooms.filter(r => r.name !== roomName); // Xóa phòng khỏi danh sách
                renderRoomList(); // Cập nhật bảng danh sách
            }
        }
        
        function renderRoomList() {
            const tbody = document.querySelector('#roomList tbody');
            tbody.innerHTML = ''; // Xóa nội dung hiện tại
        
            rooms.forEach(room => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${room.name}</td>
                    <td class="status status-${room.status === 'Trống' ? 'available' : 'occupied'}">${room.status}</td>
                    <td class="services">${room.services.join(', ')}</td>
                    <td>
                        <button class="action-button" onclick="openRoomForm('${room.name}')">Thiết Lập</button>
                        <button class="action-button" onclick="deleteRoom('${room.name}')">Xóa</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        }
        


function loadCustomerMessages() {
            const customerSelect = document.getElementById('customerSelect');
            const messageList = document.getElementById('customerMessageList').querySelector('ul');
            messageList.innerHTML = ''; // Reset tin nhắn

            // Tùy chỉnh tin nhắn cho từng khách hàng (đây chỉ là ví dụ, bạn có thể lấy từ cơ sở dữ liệu)
            const messages = {
                "Nguyễn Văn A": ["Đặt lịch hẹn cho Luna vào 20/10."],
                "Trần Thị B": ["Cảm ơn bạn đã sử dụng dịch vụ!"],
                "Lê Văn C": ["Hẹn gặp lại vào tuần sau!"]
            };

            const customer = customerSelect.value;
            if (customer && messages[customer]) {
                messages[customer].forEach(message => {
                    const newMessage = document.createElement('li');
                    newMessage.innerText = message;
                    messageList.appendChild(newMessage);
                });
            }
        }

function sendCustomerMessage() {
            const input = document.getElementById('customerMessageInput');
            const messageList = document.getElementById('customerMessageList').querySelector('ul');

            if (input.value.trim()) {
                const newMessage = document.createElement('li');
                newMessage.innerText = `Bạn: ${input.value}`;
                messageList.appendChild(newMessage);
                input.value = ''; // Reset input
            } else {
                alert('Vui lòng nhập tin nhắn.');
            }
        }

function sendCustomerImage() {
            const fileInput = document.getElementById('customerImageUpload');
            const messageList = document.getElementById('customerMessageList').querySelector('ul');

            if (fileInput.files.length > 0) {
                const file = fileInput.files[0];
                const reader = new FileReader();

                reader.onload = function(e) {
                    const newMessage = document.createElement('li');
                    newMessage.innerHTML = `
                        <span>Bạn: </span>
                        <img src="${e.target.result}" class="pet-image" alt="Hình thú cưng" />
                    `;
                    messageList.appendChild(newMessage);
                    fileInput.value = ''; // Reset input after sending
                };

                reader.readAsDataURL(file);
            } else {
                alert('Vui lòng chọn hình ảnh để gửi.');
            }
        }

function searchRooms() {
            const input = document.getElementById('searchRoom');
            const filter = input.value.toLowerCase();
            const rows = document.querySelectorAll('#roomList tbody tr');
        
            rows.forEach(row => {
                const roomName = row.cells[0].innerText.toLowerCase();
                row.style.display = roomName.includes(filter) ? '' : 'none';
            });
        }
        function validateAppointment() {
            const petName = document.getElementById('petNameAppointment').value.trim();
            const serviceType = document.getElementById('serviceTypeAppointment').value;
            const appointmentDate = document.getElementById('appointmentDate').value;
            const appointmentTime = document.getElementById('appointmentTime').value;

            if (!petName || !serviceType || !appointmentDate || !appointmentTime) {
                alert('Vui lòng điền đầy đủ thông tin.');
                return false;
            }
            return true;
        }

        function saveAppointment() {
            if (!validateAppointment()) return;

            // Logic lưu lịch hẹn, có thể bao gồm AJAX gọi server để lưu
            closeAppointmentForm();
        }
        function sendCustomerMessage() {
            const input = document.getElementById('customerMessageInput');
            const messageList = document.getElementById('customerMessageList').querySelector('ul');

            if (input.value.trim()) {
                const newMessage = document.createElement('li');
                newMessage.innerText = `Bạn: ${input.value}`;
                messageList.appendChild(newMessage);
                
                // Gọi server lưu tin nhắn
                // Example: sendMessageToServer(input.value);

                input.value = ''; // Reset input
            } else {
                alert('Vui lòng nhập tin nhắn.');
            }
        }

        function sendMessageToServer(message) {
            // Sử dụng fetch hoặc AJAX để gửi tin nhắn tới server
            fetch('/saveMessage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message })
            }).then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
        }
        function saveRoom() {
            const roomName = document.getElementById('roomName').value;
            const petName = document.getElementById('petName').value;
            const service = document.getElementById('roomServices').value;

            if (!roomName || !petName || !service) {
                alert('Vui lòng điền đầy đủ thông tin phòng.');
                return;
            }

            // Gọi server để lưu thông tin phòng
            // Example: saveRoomToServer(roomName, petName, service);

            closeRoomForm();
        }

        document.addEventListener('DOMContentLoaded', function () {
            function showSection(sectionId) {
                document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));
                document.getElementById(sectionId).classList.add('active');
            }
        
            function openAppointmentForm(petName = '', serviceType = '', appointmentDate = '', appointmentTime = '') {
                // Appointment form logic
            }
        
            function closeAppointmentForm() {
                document.getElementById('appointmentForm').classList.add('hidden');
            }
        
            function saveAppointment() {
                if (validateAppointment()) closeAppointmentForm();
            }
        
            // Other functions like addRoom, saveRoom, etc., as in your code
        });        

        let services = []; // Danh sách dịch vụ

function openServiceForm(service = null) {
    document.getElementById('serviceFormTitle').innerText = service ? 'Sửa Dịch Vụ' : 'Thêm Dịch Vụ Mới';
    document.getElementById('serviceName').value = service ? service.name : '';
    document.getElementById('serviceDescription').value = service ? service.description : '';
    document.getElementById('servicePrice').value = service ? service.price : '';
    document.getElementById('serviceForm').classList.remove('hidden');
}

function closeServiceForm() {
    document.getElementById('serviceForm').classList.add('hidden');
}

function saveService() {
    const serviceName = document.getElementById('serviceName').value.trim();
    const serviceDescription = document.getElementById('serviceDescription').value.trim();
    const servicePrice = parseFloat(document.getElementById('servicePrice').value.trim());

    if (!serviceName || !serviceDescription || isNaN(servicePrice)) {
        alert('Vui lòng điền đầy đủ thông tin dịch vụ.');
        return;
    }

    const existingService = services.find(s => s.name === serviceName);
    if (existingService) {
        // Chỉnh sửa dịch vụ
        existingService.description = serviceDescription;
        existingService.price = servicePrice;
    } else {
        // Thêm dịch vụ mới
        const newService = {
            name: serviceName,
            description: serviceDescription,
            price: servicePrice
        };
        services.push(newService);
    }

    renderServiceList();
    closeServiceForm();
}

function renderServiceList() {
    const tbody = document.querySelector('#serviceList tbody');
    tbody.innerHTML = ''; // Xóa nội dung hiện tại

    services.forEach(service => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${service.name}</td>
            <td>${service.description}</td>
            <td>${service.price.toFixed(2)} VND</td>
            <td>
                <button onclick="openServiceForm(${JSON.stringify(service)})">Chỉnh Sửa</button>
                <button onclick="deleteService('${service.name}')">Xóa</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

let editingService = null; // Biến để theo dõi dịch vụ đang chỉnh sửa

function openServiceForm(service = null) {
    if (service) {
        editingService = service; // Gán dịch vụ đang chỉnh sửa
        document.getElementById('serviceFormTitle').innerText = 'Chỉnh Sửa Dịch Vụ';
        document.getElementById('serviceName').value = service.name;
        document.getElementById('serviceDescription').value = service.description;
        document.getElementById('servicePrice').value = service.price;
    } else {
        editingService = null; // Nếu không có dịch vụ nào, đặt biến về null
        document.getElementById('serviceFormTitle').innerText = 'Thêm Dịch Vụ Mới';
        document.getElementById('serviceName').value = '';
        document.getElementById('serviceDescription').value = '';
        document.getElementById('servicePrice').value = '';
    }
    document.getElementById('serviceForm').classList.remove('hidden');
}

function saveService() {
    const name = document.getElementById('serviceName').value.trim();
    const description = document.getElementById('serviceDescription').value.trim();
    const price = parseFloat(document.getElementById('servicePrice').value);

    if (!name || !description || isNaN(price) || price < 0) {
        alert('Vui lòng điền đầy đủ thông tin hợp lệ!');
        return;
    }

    if (editingService) {
        // Cập nhật dịch vụ hiện có
        const index = services.findIndex(s => s.name === editingService.name);
        services[index] = { name, description, price };
        alert('Cập nhật dịch vụ thành công!');
    } else {
        // Thêm dịch vụ mới
        services.push({ name, description, price });
        alert('Thêm dịch vụ mới thành công!');
    }

    closeServiceForm();
    renderServiceList(); // Cập nhật danh sách dịch vụ
}

function closeServiceForm() {
    document.getElementById('serviceForm').classList.add('hidden');
    editingService = null; // Đặt lại biến chỉnh sửa
}
function deleteService(serviceName) {
    if (confirm(`Bạn có chắc chắn muốn xóa dịch vụ "${serviceName}" không?`)) {
        services = services.filter(service => service.name !== serviceName);
        renderServiceList(); // Cập nhật danh sách dịch vụ
        alert('Dịch vụ đã được xóa thành công!');
    }
}
function renderServiceList() {
    const tbody = document.querySelector('#serviceList tbody');
    tbody.innerHTML = ''; // Xóa nội dung hiện tại

    services.forEach(service => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${service.name}</td>
            <td>${service.description}</td>
            <td>${service.price.toFixed(2)} VND</td>
            <td>
                <button onclick="openServiceForm(${JSON.stringify(service)})">Chỉnh Sửa</button>
                <button onclick="deleteService('${service.name}')">Xóa</button>
                <button onclick="viewServiceDetail('${service.name}')">Xem Chi Tiết</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}
function searchServices() {
    const searchQuery = document.getElementById('searchService').value.toLowerCase();
    const filteredServices = services.filter(service => 
        service.name.toLowerCase().includes(searchQuery)
    );

    const tbody = document.querySelector('#serviceList tbody');
    tbody.innerHTML = ''; // Xóa nội dung hiện tại

    filteredServices.forEach(service => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${service.name}</td>
            <td>${service.description}</td>
            <td>${service.price.toFixed(2)} VND</td>
            <td>
                <button onclick="openServiceForm(${JSON.stringify(service)})">Chỉnh Sửa</button>
                <button onclick="deleteService('${service.name}')">Xóa</button>
                <button onclick="viewServiceDetail('${service.name}')">Xem Chi Tiết</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

