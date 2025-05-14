import 'package:flutter/material.dart';
import '../layout/layout.dart';
import '../common/navbar.dart';
import '../router/routes.dart';

class DocumentationScreen extends StatelessWidget {
  const DocumentationScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return AppLayout(
      title: 'Documentation',
      initialTabIndex: NavBarItems.documentation,
      currentRoute: AppRoutes.documentation,
      child: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'NutriPlan Documentation',
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 16),
              const Text(
                'Overview',
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),
              const Text(
                'NutriPlan is a cross-platform Flutter application designed to help users plan meals, track nutrition, and manage dietary habits. It leverages Firebase for authentication and cloud storage, and provides a modern, interactive UI for a seamless user experience.',
              ),
              const SizedBox(height: 16),
              const Text(
                'Table of Contents',
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),
              const Text('1. Project Structure\n2. Core Features\n3. Main Components\n4. Services\n5. Theming\n6. How to Extend\n7. Troubleshooting'),
              const SizedBox(height: 16),
              const Text(
                'Project Structure',
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),
              const Text('lib/\n  auth/           # Authentication UI and logic\n  common/         # Shared widgets (e.g., navbar)\n  home/           # Home page and dashboard\n  landing/        # Landing/welcome screens\n  layout/         # App layout and wrappers\n  pages/          # Main app pages (schedule, planner, profiles, nutriai)\n  router/         # App routing\n  services/       # Business logic and integrations (auth, notifications)\n  system/         # System-level utilities (scheduler, AI, etc.)\n  theme/          # App theming and color schemes\n  main.dart       # App entry point'),
              const SizedBox(height: 16),
              const Text(
                'Core Features',
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),
              const Text('• User Authentication: Secure login, registration, and password reset using Firebase Auth.\n• Cloud Storage: User data and meal plans are stored and synced via Cloud Firestore.\n• Meal Scheduling: Users can schedule meals, receive notifications, and manage their meal calendar.\n• Profile Management: Users can update personal info, dietary preferences, and allergies.\n• AI Nutrition Assistant: Chat-based AI for personalized meal and nutrition advice.\n• Modern UI: Built with Material 3, shadcn_ui, and custom theming.'),
              const SizedBox(height: 16),
              const Text(
                'Main Components',
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),
              const Text('Authentication\nLocated in lib/services/auth_service.dart and lib/auth/.\nHandles user registration, login, logout, and profile management.\nIntegrates with Firebase Auth and Firestore for user data.'),
              const SizedBox(height: 8),
              const Text('Meal Scheduling & Notifications\nScheduling: Users can add, edit, delete, and reschedule meals.\nNotifications: Implemented in lib/system/scheduler/view_notif.dart and lib/services/notif_servie.dart.\nUses flutter_local_notifications for local reminders.\nReal-time updates via Firestore listeners.\nSchedules notifications for meal times and reminders 30 minutes before.'),
              const SizedBox(height: 8),
              const Text('Pages & Navigation\nSchedule (lib/pages/schedule.dart): View, search, and filter scheduled meals.\nPlanner (lib/pages/planner.dart): Weekly meal planner interface.\nProfiles (lib/pages/profiles.dart): User profile, dietary preferences, and allergies.\nNutrition AI (lib/pages/nutriai.dart): Chat with an AI for nutrition advice.\nNavigation is managed via a custom router and a circular navigation bar.'),
              const SizedBox(height: 8),
              const Text('AI Nutrition Assistant\nFound in lib/pages/nutriai.dart and lib/system/ai/.\nProvides a chat interface for users to ask nutrition-related questions.\nIntegrates with an AI backend (API key required, see .env setup).'),
              const SizedBox(height: 16),
              const Text(
                'Services',
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),
              const Text('AuthService\nHandles all authentication and user profile operations.\nMethods include: sign in, register, sign out, password reset, get/update user data.'),
              const SizedBox(height: 8),
              const Text('NotificationService\nSingleton service for managing local notifications.\nMethods include: initialize, show, schedule, and cancel notifications.\nUses time zone data for accurate scheduling.'),
              const SizedBox(height: 8),
              const Text('MealNotificationScheduler\nSchedules and manages meal notifications based on Firestore data.\nListens for real-time updates and user authentication changes.'),
              const SizedBox(height: 16),
              const Text(
                'Theming',
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),
              const Text('The app uses a custom theme defined in lib/theme/theme.dart.\nMaterial 3 and custom color schemes are used for a modern look.'),
              const SizedBox(height: 16),
              const Text(
                'How to Extend',
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),
              const Text('• Add New Pages: Create a new Dart file in lib/pages/ and register the route in the router.\n• Add New Services: Place business logic in lib/services/ and inject where needed.\n• Customize Notifications: Extend NotificationService for new types of reminders.\n• Integrate More AI Features: Expand the AI system in lib/system/ai/.'),
              const SizedBox(height: 16),
              const Text(
                'Troubleshooting',
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),
              const Text('• Firebase Setup: Ensure your Firebase project is correctly configured and google-services.json/GoogleService-Info.plist are in place.\n• Notifications: On Android, check notification permissions and battery optimization settings.\n• AI Chat: Ensure your API key is set in the .env file for the AI assistant to work.'),
              const SizedBox(height: 16),
              const Text(
                'References',
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),
              const Text('• Flutter Documentation: https://docs.flutter.dev/\n• Firebase for Flutter: https://firebase.flutter.dev/\n• flutter_local_notifications: https://pub.dev/packages/flutter_local_notifications'),
            ],
          ),
        ),
      ),
    );
  }
} 