const navItems = [
    {
        id: 1,
        name: 'Products',
        collapsable: true,
        navigationSections:
        {
            sectionId: 'productsIdentifier',
            'Security_Cameras': [
                { text: 'All Products', path: 'products' },
                { text: 'CCTV Cameras', path: 'products/sensors' },
                { text: 'Indoor Cameras', path: 'products/bells' },
                { text: 'Outdoor Cameras', path: 'products/bells' },
            ],

            'Sensors': [
                { text: 'All Sensors', path: 'products' },
                { text: 'Intrusion Detection', path: 'products' },
                { text: 'Door/Window Contact', path: 'products/sensors' },
                { text: 'Glass Break', path: 'products/bells' },
                { text: 'Temperature Sensors', path: 'products/bells' },
                { text: 'Vibration Sensors', path: 'products/bells' },
            ],

            'Smart_Control': [
                { text: 'All Smart Controls', path: 'products' },
                { text: 'Smart Locks', path: 'products' },
                { text: 'Remote Access Control', path: 'products/sensors' },
                { text: 'Smart Alarms', path: 'products/bells' },
                { text: 'Smart Doorbells', path: 'products/bells' },
            ]
        }
    },
    {
        id: 2,
        name: 'Services & Packages',
        collapsable: true,
        navigationSections: {
            sectionId: 'servicesIdentifier',
            'Core_Services': [
                { text: 'Installation Services', path: 'services' },
                { text: "Maintenance Services", path: 'services/sensors' },
                { text: 'Monitoring Services', path: 'services/bells' }
            ],

            'Other_Services': [
                { text: 'Consultation Services', path: 'services' },
                { text: "Emergency Services", path: 'services/sensors' },
            ],

            'Packages': [
                { text: 'Home Security Packages', path: 'services' },
                { text: "Business Security Packages", path: 'services/sensors' },
                { text: 'Special Service Add-ons', path: 'services/bells' }
            ]
        }
    },
    {
        id: 3,
        name: 'About',
        collapsable: false,
    },
    {
        id: 4,
        name: 'Contact',
        collapsable: false,
    },
];

export default navItems;