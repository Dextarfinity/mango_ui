from django.core.management.base import BaseCommand
from track.models import DonationCenter

class Command(BaseCommand):
    help = 'Load mock donation centers data for the Philippines'

    def handle(self, *args, **kwargs):
        centers = [
            {'name': 'Manila Food Bank', 'location': 'Manila, Metro Manila'},
            {'name': 'Quezon City Food Donation Center', 'location': 'Quezon City, Metro Manila'},
            {'name': 'Cebu Food Relief Center', 'location': 'Cebu City, Cebu'},
            {'name': 'Davao Food Assistance Hub', 'location': 'Davao City, Davao del Sur'},
            {'name': 'Baguio City Food Donation Center', 'location': 'Baguio City, Benguet'},
            {'name': 'Iloilo Food Bank', 'location': 'Iloilo City, Iloilo'},
            {'name': 'Zamboanga Food Relief Center', 'location': 'Zamboanga City, Zamboanga del Sur'},
            {'name': 'Cagayan de Oro Food Donation Center', 'location': 'Cagayan de Oro, Misamis Oriental'},
            {'name': 'Pasig City Food Assistance Center', 'location': 'Pasig City, Metro Manila'},
            {'name': 'Taguig Food Donation Hub', 'location': 'Taguig City, Metro Manila'},
            {'name': 'Makati Food Bank', 'location': 'Makati City, Metro Manila'},
            {'name': 'Las Piñas Food Relief Center', 'location': 'Las Piñas City, Metro Manila'},
            {'name': 'Parañaque Food Assistance Hub', 'location': 'Parañaque City, Metro Manila'},
            {'name': 'Mandaluyong Food Donation Center', 'location': 'Mandaluyong City, Metro Manila'},
            {'name': 'Marikina Food Relief Center', 'location': 'Marikina City, Metro Manila'},
            {'name': 'Pasay Food Assistance Center', 'location': 'Pasay City, Metro Manila'},
            {'name': 'Valenzuela Food Donation Hub', 'location': 'Valenzuela City, Metro Manila'},
            {'name': 'San Juan Food Bank', 'location': 'San Juan City, Metro Manila'},
            {'name': 'Malabon Food Relief Center', 'location': 'Malabon City, Metro Manila'},
            {'name': 'Navotas Food Assistance Hub', 'location': 'Navotas City, Metro Manila'},
            {'name': 'Butuan Food Donation Center', 'location': 'Butuan City, Agusan del Norte'},
            {'name': 'General Santos Food Relief Center', 'location': 'General Santos City, South Cotabato'},
            {'name': 'Koronadal Food Assistance Hub', 'location': 'Koronadal City, South Cotabato'},
            {'name': 'Cotabato City Food Donation Center', 'location': 'Cotabato City, Maguindanao'},
            {'name': 'Surigao Food Relief Center', 'location': 'Surigao City, Surigao del Norte'},
            {'name': 'Tandag Food Assistance Center', 'location': 'Tandag City, Surigao del Sur'},
            {'name': 'Kidapawan Food Donation Hub', 'location': 'Kidapawan City, North Cotabato'},
            {'name': 'Tacurong Food Bank', 'location': 'Tacurong City, Sultan Kudarat'},
            {'name': 'Iligan Food Relief Center', 'location': 'Iligan City, Lanao del Norte'},
            {'name': 'Ozamiz Food Assistance Center', 'location': 'Ozamiz City, Misamis Occidental'},
            {'name': 'Pagadian Food Donation Hub', 'location': 'Pagadian City, Zamboanga del Sur'},
            {'name': 'Dipolog Food Relief Center', 'location': 'Dipolog City, Zamboanga del Norte'},
            {'name': 'Bayugan Food Assistance Hub', 'location': 'Bayugan City, Agusan del Sur'},
            {'name': 'Bislig Food Donation Center', 'location': 'Bislig City, Surigao del Sur'},
            {'name': 'Malaybalay Food Relief Center', 'location': 'Malaybalay City, Bukidnon'},
            {'name': 'Valencia Food Assistance Center', 'location': 'Valencia City, Bukidnon'},
            {'name': 'Marawi Food Donation Hub', 'location': 'Marawi City, Lanao del Sur'},
            {'name': 'Lamitan Food Relief Center', 'location': 'Lamitan City, Basilan'},
            {'name': 'Isabela Food Assistance Center', 'location': 'Isabela City, Basilan'},
            {'name': 'Jolo Food Donation Hub', 'location': 'Jolo, Sulu'},
            {'name': 'Tawi-Tawi Food Relief Center', 'location': 'Bongao, Tawi-Tawi'},
            {'name': 'Cavite Food Donation Center', 'location': 'Cavite City, Cavite'},
            {'name': 'Laguna Food Relief Center', 'location': 'Santa Rosa, Laguna'},
            {'name': 'Batangas Food Assistance Hub', 'location': 'Batangas City, Batangas'},
            {'name': 'Rizal Food Donation Center', 'location': 'Antipolo City, Rizal'},
            {'name': 'Bulacan Food Relief Center', 'location': 'Malolos City, Bulacan'},
            {'name': 'Pampanga Food Assistance Center', 'location': 'San Fernando, Pampanga'},
            {'name': 'Nueva Ecija Food Donation Hub', 'location': 'Cabanatuan City, Nueva Ecija'},
            {'name': 'Tarlac Food Relief Center', 'location': 'Tarlac City, Tarlac'},
            {'name': 'Zambales Food Assistance Center', 'location': 'Iba, Zambales'},
        ]

        for center in centers:
            DonationCenter.objects.update_or_create(
                name=center['name'],
                defaults={'location': center['location']}
            )
        self.stdout.write(self.style.SUCCESS('Mock donation centers data loaded successfully.'))
