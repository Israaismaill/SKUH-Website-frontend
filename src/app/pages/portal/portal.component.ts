import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

declare var lucide: any;

@Component({
    selector: 'app-portal',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './portal.component.html',
    styleUrls: ['./portal.component.scss']
})
export class PatientPortalComponent implements OnInit, AfterViewInit {
    viewState: 'login' | 'register' | 'activation' | 'dashboard' = 'login';
    
    // Auth Data
    loginPhone = '';
    loginPassword = '';
    
    regName = '';
    regPhone = '';
    regPassword = '';
    
    actCode = '';
    generatedCode = '';
    
    currentUser: any = null;
    
    // Dashboard Data
    activeTab: 'dashboard' | 'appointments' | 'labs' | 'imaging' = 'dashboard';
    insuranceFile: any = null;
    reservationStatus = '';
    uploadSuccess = false;
    myAppointments: any[] = [];
    labResults: any[] = [];
    imagingRecords: any[] = [];

    ngOnInit() {
        // Check if logged in
        const usr = localStorage.getItem('currentUser');
        if (usr) {
            this.currentUser = JSON.parse(usr);
            this.viewState = 'dashboard';
            this.loadPatientData();
        }
    }

    loadPatientData() {
        if (!this.currentUser) return;
        const allAppointments = JSON.parse(localStorage.getItem('patientAppointments') || '[]');
        this.myAppointments = allAppointments.filter((a: any) => a.patientPhone === this.currentUser.phone);
        
        // Mock Lab Results for "Real Portal" feel
        this.labResults = [
            { date: '2026-03-15', name: 'Complete Blood Count (CBC)', result: 'Normal', status: 'Final' },
            { date: '2026-03-15', name: 'Lipid Profile', result: 'Slightly High Cholesterol', status: 'Final' },
            { date: '2026-02-10', name: 'Blood Glucose (Fasting)', result: '95 mg/dL', status: 'Final' }
        ];

        // Mock Imaging for "Real Portal" feel
        this.imagingRecords = [
            { date: '2026-03-12', type: 'Chest X-Ray', findings: 'Clear lungs, normal heart size.', id: 'XR-7721' },
            { date: '2026-01-05', type: 'Abdominal Ultrasound', findings: 'No abnormalities detected in major organs.', id: 'US-4402' }
        ];

        // Check if ID was already uploaded (stored in user object)
        if (this.currentUser.insuranceIdFile) {
            this.insuranceFile = this.currentUser.insuranceIdFile;
            this.uploadSuccess = true;
        }

        setTimeout(() => { if (typeof lucide !== 'undefined') lucide.createIcons(); }, 100);
    }

    setActiveTab(tab: any) {
        this.activeTab = tab;
        setTimeout(() => { if (typeof lucide !== 'undefined') lucide.createIcons(); }, 50);
    }

    ngAfterViewInit() {
        if (typeof lucide !== 'undefined') {
            setTimeout(() => lucide.createIcons(), 100);
        }
    }

    goToRegister() {
        this.viewState = 'register';
    }

    goToLogin() {
        this.viewState = 'login';
    }

    register() {
        if (!this.regName || !this.regPhone || !this.regPassword) {
            alert('Please fill all fields');
            return;
        }
        // Save user to local storage db
        let users = JSON.parse(localStorage.getItem('portalUsers') || '[]');
        if (users.find((u:any) => u.phone === this.regPhone)) {
            alert('User already exists!');
            return;
        }
        users.push({ name: this.regName, phone: this.regPhone, password: this.regPassword, active: false, insuranceIdFile: null });
        localStorage.setItem('portalUsers', JSON.stringify(users));
        
        // Generate activation code
        this.generatedCode = Math.floor(1000 + Math.random() * 9000).toString();
        alert('Your activation code is: ' + this.generatedCode);
        this.viewState = 'activation';
    }

    activate() {
        if (this.actCode === this.generatedCode || this.actCode === '1234') { // 1234 as fallback
            let users = JSON.parse(localStorage.getItem('portalUsers') || '[]');
            let usr = users.find((u:any) => u.phone === this.regPhone);
            if (usr) {
                usr.active = true;
                localStorage.setItem('portalUsers', JSON.stringify(users));
                alert('Account activated! You can now login.');
                this.viewState = 'login';
            }
        } else {
            alert('Invalid code');
        }
    }

    login() {
        let users = JSON.parse(localStorage.getItem('portalUsers') || '[]');
        let usr = users.find((u:any) => u.phone === this.loginPhone && u.password === this.loginPassword);
        if (usr) {
            if (!usr.active) {
                alert('Account not activated. Please register again or activate.');
                return;
            }
            this.currentUser = usr;
            localStorage.setItem('currentUser', JSON.stringify(usr));
            this.viewState = 'dashboard';
            this.loadPatientData();
        } else {
            alert('Invalid credentials');
        }
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUser = null;
        this.viewState = 'login';
    }

    onFileSelect(event: any) {
        if (event.target.files.length > 0) {
            this.insuranceFile = event.target.files[0].name;
            this.uploadSuccess = false;
        }
    }

    submitRequest() {
        if (!this.insuranceFile) {
            alert('Please select an insurance ID file first.');
            return;
        }
        
        // Update current user and global users list
        this.currentUser.insuranceIdFile = this.insuranceFile;
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

        let users = JSON.parse(localStorage.getItem('portalUsers') || '[]');
        let usrIdx = users.findIndex((u:any) => u.phone === this.currentUser.phone);
        if (usrIdx > -1) {
            users[usrIdx].insuranceIdFile = this.insuranceFile;
            localStorage.setItem('portalUsers', JSON.stringify(users));
        }

        // Also push to portalRequests for admin to see the record
        let requests = JSON.parse(localStorage.getItem('portalRequests') || '[]');
        requests.push({
            id: Date.now(),
            patientName: this.currentUser.name,
            patientPhone: this.currentUser.phone,
            insuranceIdFile: this.insuranceFile,
            status: 'Verified', // No longer 'Pending'
            date: new Date().toLocaleDateString()
        });
        localStorage.setItem('portalRequests', JSON.stringify(requests));
        
        this.uploadSuccess = true;
        alert('Insurance ID saved to your profile successfully.');
    }
}
