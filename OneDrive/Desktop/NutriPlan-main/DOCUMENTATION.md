# NutriPlan Documentation

## Overview

**NutriPlan** is a cross-platform Flutter application designed to help users plan meals, track nutrition, and manage dietary habits. It leverages Firebase for authentication and cloud storage, and provides a modern, interactive UI for a seamless user experience.

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [Core Features](#core-features)
3. [Main Components](#main-components)
    - [Authentication](#authentication)
    - [Meal Scheduling & Notifications](#meal-scheduling--notifications)
    - [Pages & Navigation](#pages--navigation)
    - [AI Nutrition Assistant](#ai-nutrition-assistant)
4. [Services](#services)
5. [Theming](#theming)
6. [How to Extend](#how-to-extend)
7. [Troubleshooting](#troubleshooting)

---

## Project Structure

```
lib/
  auth/           # Authentication UI and logic
  common/         # Shared widgets (e.g., navbar)
  home/           # Home page and dashboard
  landing/        # Landing/welcome screens
  layout/         # App layout and wrappers
  pages/          # Main app pages (schedule, planner, profiles, nutriai)
  router/         # App routing
  services/       # Business logic and integrations (auth, notifications)
  system/         # System-level utilities (scheduler, AI, etc.)
  theme/          # App theming and color schemes
  main.dart       # App entry point
```

---

## Core Features

- **User Authentication**: Secure login, registration, and password reset using Firebase Auth.
- **Cloud Storage**: User data and meal plans are stored and synced via Cloud Firestore.
- **Meal Scheduling**: Users can schedule meals, receive notifications, and manage their meal calendar.
- **Profile Management**: Users can update personal info, dietary preferences, and allergies.
- **AI Nutrition Assistant**: Chat-based AI for personalized meal and nutrition advice.
- **Modern UI**: Built with Material 3, shadcn_ui, and custom theming.

---

## Main Components

### Authentication

- Located in `lib/services/auth_service.dart` and `lib/auth/`.
- Handles user registration, login, logout, and profile management.
- Integrates with Firebase Auth and Firestore for user data.

### Meal Scheduling & Notifications

- **Scheduling**: Users can add, edit, delete, and reschedule meals.
- **Notifications**: 
  - Implemented in `lib/system/scheduler/view_notif.dart` and `lib/services/notif_servie.dart`.
  - Uses `flutter_local_notifications` for local reminders.
  - Real-time updates via Firestore listeners.
  - Schedules notifications for meal times and reminders 30 minutes before.

### Pages & Navigation

- **Schedule** (`lib/pages/schedule.dart`): View, search, and filter scheduled meals.
- **Planner** (`lib/pages/planner.dart`): Weekly meal planner interface.
- **Profiles** (`lib/pages/profiles.dart`): User profile, dietary preferences, and allergies.
- **Nutrition AI** (`lib/pages/nutriai.dart`): Chat with an AI for nutrition advice.
- Navigation is managed via a custom router and a circular navigation bar.

### AI Nutrition Assistant

- Found in `lib/pages/nutriai.dart` and `lib/system/ai/`.
- Provides a chat interface for users to ask nutrition-related questions.
- Integrates with an AI backend (API key required, see `.env` setup).

---

## Services

### AuthService

- Handles all authentication and user profile operations.
- Methods include: sign in, register, sign out, password reset, get/update user data.

### NotificationService

- Singleton service for managing local notifications.
- Methods include: initialize, show, schedule, and cancel notifications.
- Uses time zone data for accurate scheduling.

### MealNotificationScheduler

- Schedules and manages meal notifications based on Firestore data.
- Listens for real-time updates and user authentication changes.

---

## Theming

- The app uses a custom theme defined in `lib/theme/theme.dart`.
- Material 3 and custom color schemes are used for a modern look.

---

## How to Extend

- **Add New Pages**: Create a new Dart file in `lib/pages/` and register the route in the router.
- **Add New Services**: Place business logic in `lib/services/` and inject where needed.
- **Customize Notifications**: Extend `NotificationService` for new types of reminders.
- **Integrate More AI Features**: Expand the AI system in `lib/system/ai/`.

---

## Troubleshooting

- **Firebase Setup**: Ensure your Firebase project is correctly configured and `google-services.json`/`GoogleService-Info.plist` are in place.
- **Notifications**: On Android, check notification permissions and battery optimization settings.
- **AI Chat**: Ensure your API key is set in the `.env` file for the AI assistant to work.

---

## References

- [Flutter Documentation](https://docs.flutter.dev/)
- [Firebase for Flutter](https://firebase.flutter.dev/)
- [flutter_local_notifications](https://pub.dev/packages/flutter_local_notifications) 