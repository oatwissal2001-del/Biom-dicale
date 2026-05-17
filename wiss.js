/**
 * BioMed Diagnostic - Application de Diagnostic Biomédical
 */

// ============================================
// BASE DE DONNÉES
// ============================================
let equipmentDB = [
    {
        id: 'scalpel',
        name: 'Bistouri Électrique',
        icon: '📟',
        faults: [
            { title: 'Échauffement anormal de la plaque neutre', severity: 'high', solution: 'Vérifier le bon positionnement de la plaque, s\'assurer que la peau est propre et sèche, éviter les plis sous la plaque.' },
            { title: 'Puissance faible / coupe instable', severity: 'medium', solution: 'Vérifier le réglage de puissance et vérifier l\'électrode active.' },
            { title: 'L\'appareil ne s\'allume pas', severity: 'low', solution: 'Vérifier la prise électrique et le fusible.' }
        ]
    },
    {
        id: 'monitor',
        name: 'Moniteur Patient',
        icon: '📈',
        faults: [
            { title: 'Écran noir (pas d\'affichage)', severity: 'high', solution: 'Vérifier l\'alimentation électrique, la carte mère et l\'écran LCD.' },
            { title: 'SpO2 non mesurable', severity: 'high', solution: 'Changer le capteur, vérifier le câble et tester sur un autre patient.' },
            { title: 'Tension artérielle impossible', severity: 'medium', solution: 'Vérifier le brassard et contrôler les fuites d\'air.' },
            { title: 'Batterie ne charge pas', severity: 'low', solution: 'Vérifier le chargeur et tester la batterie.' }
        ]
    },
    {
        id: 'syringe',
        name: 'Pousse-Seringue',
        icon: '💉',
        faults: [
            { title: 'Occlusion alarme', severity: 'high', solution: 'Vérifier l\'obstruction de la ligne et le positionnement de la seringue.' },
            { title: 'Précision de débit incorrecte', severity: 'high', solution: 'Calibrer la pompe et vérifier le diamètre de la seringue.' },
            { title: 'Seringue non reconnue', severity: 'medium', solution: 'Nettoyer le détecteur et vérifier le type de seringue.' }
        ]
    },
    {
        id: 'autoclave',
        name: 'Autoclave',
        icon: '♨️',
        faults: [
            { title: 'Cycle stérilisation échoué', severity: 'high', solution: 'Vérifier les paramètres du cycle et les capteurs.' },
            { title: 'Fuite de vapeur', severity: 'high', solution: 'Vérifier le joint d\'étanchéité et s\'assurer que la porte est bien fermée.' },
            { title: 'Pompe à vide inefficace', severity: 'medium', solution: 'Vérifier la pompe et le niveau d\'huile.' }
        ]
    },
    {
        id: 'aspirator',
        name: 'Aspirateur Chirurgical',
        icon: '🌪️',
        faults: [
            { title: 'Absence d\'aspiration', severity: 'high', solution: 'Vérifier le moteur, le filtre et les tuyaux.' },
            { title: 'Aspiration faible', severity: 'medium', solution: 'Nettoyer le filtre et vérifier l\'étanchéité.' },
            { title: 'L\'appareil ne s\'allume pas', severity: 'low', solution: 'Vérifier la prise et le fusible.' }
        ]
    },
    {
        id: 'xray',
        name: 'Radiographie',
        icon: '🦴',
        faults: [
            { title: 'Pas d\'exposition', severity: 'high', solution: 'Vérifier le tube et le générateur HT.' },
            { title: 'Image bruitée', severity: 'medium', solution: 'Vérifier la tension et calibrer le détecteur.' },
            { title: 'Fuite de radiation', severity: 'high', solution: 'ARRÊT IMMÉDIAT. Vérifier les joints du tube.' }
        ]
    },
    {
        id: 'defibrillator',
        name: 'Défibrillateur',
        icon: '⚡',
        faults: [
            { title: 'Absence de choc électrique', severity: 'high', solution: 'Vérifier la batterie et remplacer les électrodes.' },
            { title: 'Défaut d\'analyse', severity: 'high', solution: 'Vérifier le contact des électrodes et nettoyer la peau.' }
        ]
    },
    {
        id: 'ultrasound',
        name: 'Échographe',
        icon: '🔊',
        faults: [
            { title: 'Absence totale d\'image', severity: 'high', solution: 'Vérifier l\'alimentation et la sonde.' },
            { title: 'Sonde non détectée', severity: 'high', solution: 'Vérifier le connecteur et nettoyer le port.' }
        ]
    },
    {
        id: 'ventilator',
        name: 'Ventilateur',
        icon: '🫁',
        faults: [
            { title: 'Alarme déconnexion', severity: 'high', solution: 'Vérifier le circuit et le tube.' },
            { title: 'Pression élevée', severity: 'high', solution: 'Vérifier l\'encombrement et contrôler le circuit.' }
        ]
    },
    {
        id: 'perfusion',
        name: 'Pompe à Perfusion',
        icon: '💊',
        faults: [
            { title: 'Alarme bolus', severity: 'high', solution: 'Vérifier le site et la ligne.' },
            { title: 'Alarme occlusion', severity: 'high', solution: 'Vérifier la ligne et le cathéter.' }
        ]
    },
    {
        id: 'ecg',
        name: 'ECG',
        icon: '💓',
        faults: [
            { title: 'Absence de signal', severity: 'high', solution: 'Vérifier les électrodes et les câbles.' },
            { title: 'Signal bruité', severity: 'medium', solution: 'Vérifier les électrodes et éloigner les interférences.' }
        ]
    },
    {
        id: 'incubator',
        name: 'Couveuse Néonatale',
        icon: '👶',
        faults: [
            { title: 'Température instable', severity: 'high', solution: 'Vérifier la sonde et la résistance.' },
            { title: 'Humidité faible', severity: 'medium', solution: 'Vérifier le niveau d\'eau et nettoyer le système.' }
        ]
    }
];

// ============================================
// AUTHENTIFICATION
// ============================================
const users = {
    technicien: { password: 'wiss123', names: ['Ouatmane', 'Ajmi'] },
    admin: { password: 'admin123', name: 'Administrateur' }
};

let currentUser = null;
let currentRole = null;
let currentEquipment = null;
let diagnosticHistory = JSON.parse(localStorage.getItem('diagnosticHistory') || '[]');
let selectedFaultsForReport = [];

function login() {
    const role = document.getElementById('roleSelect').value;
    const password = document.getElementById('passwordInput').value;
    const errorDiv = document.getElementById('loginError');

    if (role === 'admin') {
        if (password === users.admin.password) {
            currentUser = { name: users.admin.name, role: 'admin' };
            currentRole = 'admin';
            errorDiv.textContent = '';
            showMainApp();
        } else {
            errorDiv.textContent = 'Mot de passe administrateur incorrect';
        }
    } else if (role === 'technicien') {
        if (password === users.technicien.password) {
            let techName = '';
            let validTech = false;
            while (!validTech) {
                techName = prompt('Entrez votre nom (Ouatmane ou Ajmi):');
                if (techName === 'Ouatmane' || techName === 'Ajmi') {
                    validTech = true;
                } else {
                    alert('Nom non reconnu');
                }
            }
            currentUser = { name: techName, role: 'technicien' };
            currentRole = 'technicien';
            errorDiv.textContent = '';
            showMainApp();
        } else {
            errorDiv.textContent = 'Mot de passe incorrect';
        }
    }
}

function showMainApp() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('mainApp').style.display = 'block';
    document.getElementById('userNameDisplay').innerHTML = `${currentUser.name} (${currentRole === 'admin' ? 'Admin' : 'Technicien'})`;
    renderEquipmentGrid();
}

function logout() {
    currentUser = null;
    currentRole = null;
    selectedFaultsForReport = [];
    document.getElementById('loginPage').style.display = 'flex';
    document.getElementById('mainApp').style.display = 'none';
    document.getElementById('passwordInput').value = '';
}

function renderEquipmentGrid() {
    const grid = document.getElementById('equipmentGrid');
    grid.innerHTML = equipmentDB.map(eq => `
        <div class="equipment-card" onclick="selectEquipment('${eq.id}')" id="card-${eq.id}">
            <span class="equipment-icon">${eq.icon}</span>
            <div class="equipment-name">${eq.name}</div>
        </div>
    `).join('');
}

function selectEquipment(id) {
    document.querySelectorAll('.equipment-card').forEach(card => card.classList.remove('active'));
    document.getElementById(`card-${id}`).classList.add('active');
    currentEquipment = equipmentDB.find(eq => eq.id === id);
    selectedFaultsForReport = [];
    renderDiagnosticArea();
}

function renderDiagnosticArea() {
    const area = document.getElementById('diagnosticArea');
    if (!currentEquipment) {
        area.innerHTML = `<div class="empty-state"><div class="empty-icon">🔬</div><h3>Sélectionnez un équipement médical</h3></div>`;
        return;
    }

    let adminActions = '';
    if (currentRole === 'admin') {
        adminActions = `
            <div class="admin-actions">
                <button class="btn-admin" onclick="openAddFaultModal()">➕ Ajouter une panne</button>
                <button class="btn-admin" onclick="showDashboard()">📊 Tableau de bord</button>
            </div>
        `;
    } else {
        adminActions = `<div class="admin-actions"><button class="btn-admin" onclick="showDashboard()">📊 Tableau de bord</button></div>`;
    }

    area.innerHTML = `
        <div class="section-card">
            <div class="section-header">
                <div class="section-icon">${currentEquipment.icon}</div>
                <div class="section-title">
                    <h2>${currentEquipment.name}</h2>
                    <p>${currentRole === 'technicien' ? '📋 Cochez les pannes | 👆 Cliquez sur une panne pour voir la solution' : '👆 Cliquez sur une panne pour voir la solution'}</p>
                </div>
            </div>
            ${adminActions}
            <div class="faults-container">
                ${currentEquipment.faults.map((fault, idx) => `
                    <div class="fault-card" data-fault-index="${idx}" onclick="toggleFault(this, event)">
                        <div class="fault-header-with-checkbox">
                            <div class="fault-info-with-checkbox">
                                ${currentRole === 'technicien' ? `<input type="checkbox" class="fault-checkbox" data-fault-idx="${idx}" onclick="event.stopPropagation(); toggleFaultSelection(${idx}, this.checked)">` : ''}
                                <div class="fault-title">
                                    <span class="fault-code">P${idx+1}</span>
                                    ${fault.title}
                                    <span class="severity ${fault.severity}">${fault.severity === 'high' ? '⚠️ CRITIQUE' : fault.severity === 'medium' ? '🟠 MOYEN' : '🟢 FAIBLE'}</span>
                                </div>
                            </div>
                            <div class="fault-arrow">▼</div>
                        </div>
                        <div class="fault-solution">
                            <div class="solution-label">🔧 SOLUTION :</div>
                            <div class="solution-text">${fault.solution}</div>
                            ${currentRole === 'admin' ? `
                                <div class="admin-buttons">
                                    <button class="btn-admin" onclick="event.stopPropagation(); openEditFaultModal(${idx})">✏️ Modifier</button>
                                    <button class="btn-admin btn-danger" onclick="event.stopPropagation(); deleteFault(${idx})">🗑️ Supprimer</button>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
            ${currentRole === 'technicien' ? `
                <div class="report-actions">
                    <button class="btn-admin btn-print" onclick="prepareReport()" id="generateReportBtn">
                        📄 Générer le rapport (${selectedFaultsForReport.length} panne(s))
                    </button>
                </div>
            ` : ''}
        </div>
    `;
}

function toggleFault(element, event) {
    if (event && (event.target.classList.contains('btn-admin') || event.target.classList.contains('fault-checkbox'))) {
        return;
    }
    element.classList.toggle('expanded');
}

function toggleFaultSelection(faultIndex, isChecked) {
    if (isChecked) {
        if (!selectedFaultsForReport.includes(faultIndex)) {
            selectedFaultsForReport.push(faultIndex);
        }
    } else {
        selectedFaultsForReport = selectedFaultsForReport.filter(i => i !== faultIndex);
    }
    const generateBtn = document.getElementById('generateReportBtn');
    if (generateBtn) {
        generateBtn.innerHTML = `📄 Générer le rapport (${selectedFaultsForReport.length} panne(s))`;
    }
}

// ============================================
// FONCTIONS ADMIN
// ============================================
function openAddFaultModal() {
    document.getElementById('modalTitle').innerText = '➕ Ajouter une panne';
    document.getElementById('faultIndex').value = '';
    document.getElementById('faultTitle').value = '';
    document.getElementById('faultSeverity').value = 'medium';
    document.getElementById('faultSolution').value = '';
    document.getElementById('faultModal').style.display = 'flex';
}

function openEditFaultModal(index) {
    const fault = currentEquipment.faults[index];
    document.getElementById('modalTitle').innerText = '✏️ Modifier la panne';
    document.getElementById('faultIndex').value = index;
    document.getElementById('faultTitle').value = fault.title;
    document.getElementById('faultSeverity').value = fault.severity;
    document.getElementById('faultSolution').value = fault.solution;
    document.getElementById('faultModal').style.display = 'flex';
}

function saveFault() {
    const index = document.getElementById('faultIndex').value;
    const fault = {
        title: document.getElementById('faultTitle').value,
        severity: document.getElementById('faultSeverity').value,
        solution: document.getElementById('faultSolution').value
    };
    if (!fault.title.trim()) { alert('Le titre est requis'); return; }
    if (index === '') {
        currentEquipment.faults.push(fault);
        alert('✅ Panne ajoutée');
    } else {
        currentEquipment.faults[parseInt(index)] = fault;
        alert('✅ Panne modifiée');
    }
    closeModal();
    selectedFaultsForReport = [];
    renderDiagnosticArea();
}

function deleteFault(index) {
    if (confirm('Supprimer cette panne ?')) {
        currentEquipment.faults.splice(index, 1);
        selectedFaultsForReport = [];
        renderDiagnosticArea();
        alert('✅ Panne supprimée');
    }
}

function closeModal() { document.getElementById('faultModal').style.display = 'none'; }

// ============================================
// TABLEAU DE BORD
// ============================================
function showDashboard() {
    let totalFaults = 0, criticalFaults = 0;
    equipmentDB.forEach(eq => {
        totalFaults += eq.faults.length;
        eq.faults.forEach(f => { if (f.severity === 'high') criticalFaults++; });
    });
    document.getElementById('statEquipments').innerText = equipmentDB.length;
    document.getElementById('statFaults').innerText = totalFaults;
    document.getElementById('statDiagnostics').innerText = diagnosticHistory.length;
    document.getElementById('statTechs').innerText = '2';
    document.getElementById('statCritical').innerText = criticalFaults;
    
    const reportsHtml = diagnosticHistory.slice().reverse().map(r => `
        <div class="report-item">
            <div><strong>📅 ${r.date}</strong></div>
            <div>🔧 ${r.equipment}</div>
            <div>👤 ${r.technician} - ${r.faultsCount} panne(s)</div>
            <div style="font-size: 10px; color: #666;">Pannes: ${r.faults.substring(0, 50)}${r.faults.length > 50 ? '...' : ''}</div>
        </div>
    `).join('');
    document.getElementById('reportsList').innerHTML = reportsHtml || '<p style="text-align:center;">Aucun diagnostic enregistré</p>';
    document.getElementById('dashboardModal').style.display = 'flex';
}

function closeDashboard() { document.getElementById('dashboardModal').style.display = 'none'; }

// ============================================
// RAPPORT PDF - SIMPLE (Nature + Solution unique)
// ============================================
function prepareReport() {
    if (!currentEquipment) { alert('Sélectionnez un équipement'); return; }
    if (selectedFaultsForReport.length === 0) { alert('Sélectionnez au moins une panne'); return; }
    generateReport();
}

function generateReport() {
    const selectedFaults = selectedFaultsForReport.map(idx => currentEquipment.faults[idx]);
    const previewHtml = generateReportHTML(selectedFaults);
    document.getElementById('reportPreview').innerHTML = previewHtml;
    document.getElementById('reportModal').style.display = 'flex';
}

function generateReportHTML(selectedFaults) {
    const date = new Date().toLocaleString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    const reportId = 'RAP-' + date.replace(/[/,:]/g, '').replace(/ /g, '-');
    
    let faultsHtml = '';
    selectedFaults.forEach((fault, idx) => {
        faultsHtml += `
            <div style="margin-bottom: 20px; padding: 12px; border-bottom: 1px solid #e0e0e0;">
                <div style="display: flex; align-items: flex-start; gap: 12px;">
                    <div style="min-width: 35px;">
                        <span style="background: #0066cc; color: white; width: 28px; height: 28px; display: inline-flex; align-items: center; justify-content: center; border-radius: 50%; font-size: 12px; font-weight: bold;">${idx+1}</span>
                    </div>
                    <div style="flex: 1;">
                        <div style="font-weight: 700; color: #1e293b; margin-bottom: 8px; font-size: 14px;">📌 ${fault.title}</div>
                        <div style="color: #475569; font-size: 13px; line-height: 1.5; background: #f8fafc; padding: 10px; border-radius: 6px;">
                            <span style="font-weight: 600;">✓ Solution :</span> ${fault.solution}
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    return `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 800px; margin: 0 auto;">
            <!-- En-tête -->
            <div style="text-align: center; border-bottom: 2px solid #0066cc; padding-bottom: 12px; margin-bottom: 20px;">
                <div style="font-size: 40px;">🏥</div>
                <h1 style="color: #003366; margin: 5px 0; font-size: 22px;">BIOMED DIAGNOSTIC</h1>
                <p style="color: #666; font-size: 11px;">Rapport d'intervention technique</p>
            </div>
            
            <!-- Informations -->
            <div style="background: #f8fafc; padding: 12px 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e2e8f0;">
                <table style="width: 100%; font-size: 13px;">
                    <tr><td style="padding: 5px; width: 35%;"><strong>Référence:</strong></td><td>${reportId}</td></tr>
                    <tr><td style="padding: 5px;"><strong>Date:</strong></td><td>${date}</td></tr>
                    <tr><td style="padding: 5px;"><strong>Technicien:</strong></td><td>${currentUser.name}</td></tr>
                    <tr><td style="padding: 5px;"><strong>Équipement:</strong></td><td>${currentEquipment.icon} ${currentEquipment.name}</td></tr>
                    <tr><td style="padding: 5px;"><strong>Nombre de pannes:</strong></td><td><span style="background: #0066cc; color: white; padding: 2px 10px; border-radius: 20px; font-size: 11px;">${selectedFaults.length} panne(s)</span></td></tr>
                </table>
            </div>
            
            <!-- Titre -->
            <h3 style="color: #0066cc; margin: 20px 0 15px; font-size: 16px;">🔧 DÉTAIL DES PANNES ET SOLUTIONS</h3>
            
            <!-- Liste des pannes avec solution unique -->
            <div style="background: white; border: 1px solid #e2e8f0; border-radius: 10px; padding: 5px 15px;">
                ${faultsHtml}
            </div>
            
            <!-- Signature -->
            <div style="margin-top: 40px;">
                <div style="display: flex; justify-content: space-between; gap: 30px;">
                    <div style="flex: 1;">
                        <div style="border-bottom: 1px solid #333; width: 100%; padding-bottom: 5px;"></div>
                        <p style="font-size: 11px; margin-top: 8px; color: #475569;">Signature du technicien</p>
                        <p style="font-size: 13px; font-weight: bold; color: #0066cc; margin-top: 3px;">${currentUser.name}</p>
                    </div>
                    <div style="flex: 1;">
                        <div style="border-bottom: 1px solid #333; width: 100%; padding-bottom: 5px;"></div>
                        <p style="font-size: 11px; margin-top: 8px; color: #475569;">Cachet / Visa</p>
                    </div>
                </div>
            </div>
            
            <!-- Pied de page -->
            <div style="margin-top: 30px; text-align: center; font-size: 9px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 10px;">
                <p>BioMed Diagnostic System - Document généré automatiquement</p>
            </div>
        </div>
    `;
}

function generateAndPrintReport() {
    const selectedFaults = selectedFaultsForReport.map(idx => currentEquipment.faults[idx]);
    const reportHtml = generateReportHTML(selectedFaults);
    
    // Sauvegarder dans l'historique des diagnostics
    const newDiagnostic = {
        date: new Date().toLocaleString('fr-FR'),
        technician: currentUser.name,
        equipment: currentEquipment.name,
        faultsCount: selectedFaults.length,
        faults: selectedFaults.map(f => f.title).join(', ')
    };
    diagnosticHistory.push(newDiagnostic);
    localStorage.setItem('diagnosticHistory', JSON.stringify(diagnosticHistory));
    
    // Afficher confirmation
    alert(`✅ Diagnostic enregistré !\n\nÉquipement: ${currentEquipment.name}\nPannes: ${selectedFaults.length}\nDate: ${newDiagnostic.date}`);
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head><meta charset="UTF-8"><title>Rapport - ${currentEquipment.name}</title>
        <style>
            *{margin:0;padding:0;box-sizing:border-box;}
            body{font-family:'Segoe UI',Arial,sans-serif;padding:30px;background:white;}
            @media print{body{padding:15px;}.no-print{display:none;}}
        </style>
        </head>
        <body>
            ${reportHtml}
            <div class="no-print" style="text-align:center;margin-top:20px;">
                <button onclick="window.print()" style="padding:10px 20px;background:#0066cc;color:white;border:none;border-radius:5px;cursor:pointer;">🖨️ Imprimer / Sauvegarder PDF</button>
            </div>
            <script>setTimeout(() => window.print(), 500);<\/script>
        </body>
        </html>
    `);
    printWindow.document.close();
    closeReportModal();
    
    // Réinitialiser les sélections
    selectedFaultsForReport = [];
    renderDiagnosticArea();
}

function closeReportModal() { document.getElementById('reportModal').style.display = 'none'; }

window.onload = () => { document.getElementById('loginPage').style.display = 'flex'; };