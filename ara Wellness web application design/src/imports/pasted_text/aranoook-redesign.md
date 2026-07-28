You are an expert Senior Product Designer, UX Researcher, UI/UX Designer, and Senior React Frontend Engineer. Your task is to completely redesign my wellness web application, AraNook, from the ground up. Do NOT try to improve or patch the existing implementation. Use it only as inspiration for the visual identity. Rebuild the product from first principles with a strong focus on user experience, functionality, accessibility, and polished interactions.

The goal is to create a premium wellness web application that feels complete, realistic, calming, and production-ready. Every feature must genuinely work without requiring a backend or user authentication. Use Local Storage wherever persistent user data is needed. Avoid fake buttons, placeholder cards, or non-functional UI. If a feature cannot work without a backend, redesign it into something that can.

## Brand Identity

Keep the existing visual identity:

- Earthy greens
- Warm beige backgrounds
- Soft neutral colours
- Organic shapes
- Rounded cards
- Gentle shadows
- Clean typography
- Nature-inspired illustrations
- Calm animations
- Spacious layouts
- Minimalistic interface

The application should feel like a blend of Calm, Headspace, Apple Health, and Notion while maintaining its own unique identity. The interface should immediately make users feel relaxed rather than overwhelmed.

## Homepage

Redesign the homepage to become the central wellness dashboard with only meaningful and fully functional sections.

Include:

• Welcome section with dynamic greeting based on time of day
• A unique wellness quote that changes every refresh or day from a large collection (avoid repeating quotes)
• A breathing exercise card with quick start
• Today's reflection question selected from a large collection of prompts
• Mood Check-In
• Today's Wellness Checklist
• Quick access cards
• Wellness Library preview
• Pantry Recipe Generator preview
• Clean footer with another rotating wellness quote

Every section should have purpose.

## Mood Check-In

Allow users to select how they feel today.

Options:

😊 Happy
😌 Calm
😐 Neutral
😟 Stressed
😴 Tired
😔 Low

After selecting a mood, intelligently recommend one or more activities such as:

• Guided Breathing
• Gratitude Journal
• Wellness Library article
• Healthy Recipe
• Focus Timer

Save the selected mood locally.

## Guided Breathing

This should become the flagship feature.

Include multiple breathing techniques:

• Box Breathing
• 4-7-8 Breathing
• Deep Calm
• Focus
• Sleep
• Custom Breathing

Each breathing mode should include:

Animated breathing circle

Step instructions

Progress animation

Timer

Completion screen

Optional calming sounds

Adjustable duration

Everything must function smoothly.

## Pantry Recipe Generator

Remove the current Daily Recipes completely.

Replace it with an AI-powered Pantry Recipe Generator.

The user should first choose ingredients they already have.

Provide searchable ingredient categories.

Then ask:

What are you craving?

• Sweet
• Savoury
• Spicy
• Comfort Food
• Healthy
• Random

Meal Type

• Breakfast
• Lunch
• Dinner
• Snack
• Dessert

Cooking Time

• Under 10 mins
• 20 mins
• 30+ mins

Diet

• Vegetarian
• Vegan
• High Protein
• Gluten Free
• Dairy Free
• No Preference

Difficulty

• Easy
• Medium
• Advanced

Generate multiple healthy recipes instead of only one.

Each recipe should display:

Recipe image placeholder

Cooking time

Calories

Protein

Carbs

Fat

Difficulty

Ingredients

Step-by-step instructions

Healthy substitutions

Nutrition highlights

Allow infinite regeneration of recipes.

## Wellness Library

Expand into a proper knowledge hub.

Categories:

Meditation

Nutrition

Movement

Mental Wellness

Sleep

Stress Management

Habit Building

Productivity

Self Care

Digital Wellness

Nature

Each category should contain multiple beautifully designed articles.

Articles should open inside elegant modals.

Everything should feel complete.

## Today's Wellness Checklist

Replace the Weekly Planner.

Users should be able to:

Add tasks

Delete tasks

Check tasks

Reorder tasks

Automatically save everything using Local Storage.

Include helpful default tasks such as:

Drink Water

Stretch

Walk

Meditate

Journal

Read

Eat Fruit

## Gratitude Journal

Create a simple journal where users can write gratitude entries.

Save entries locally.

Include prompts like:

What made you smile today?

Who are you grateful for?

What are you thankful for today?

## Water Intake Tracker

Allow users to track daily water intake with a clean visual progress indicator.

Persist using Local Storage.

## Focus Timer

Include a beautiful Pomodoro timer.

Options:

25 Minutes

45 Minutes

60 Minutes

Custom Duration

Show relaxing animations while running.

## Settings

The Settings page must actually work.

Include:

Theme

• Light
• Dark
• System

Accent Colours

• Sage
• Forest
• Terracotta
• Sand
• Lavender

Font Size

• Small
• Medium
• Large

Reduce Motion

Sound

Default Breathing Mode

Default Session Length

Persist every setting using Local Storage.

Remove every fake toggle or placeholder.

## Quotes

Create a large collection of motivational and wellness quotes covering topics such as:

Mindfulness

Growth

Nature

Gratitude

Calmness

Discipline

Self Care

Happiness

Reflection

Productivity

Quotes should rotate naturally and should rarely repeat.

Also create a large collection of thoughtful daily reflection questions.

## Navigation

Create a clean navigation with:

Home

Breathing

Recipes

Library

Journal

Checklist

Settings

Fully responsive on desktop, tablet, and mobile.

## Accessibility

Support:

Keyboard navigation

Screen readers

High contrast

Reduced motion

Visible focus states

Responsive layouts

## Technical Requirements

Use:

React

TypeScript

Vite

Reusable components

Proper folder structure

Responsive design

Accessible components

Clean architecture

Optimised performance

Smooth animations

Production-quality code

## Do NOT Include

User accounts

Authentication

Weekly planners

Leaderboards

Achievements

Social feeds

Placeholder components

Fake analytics

Broken UI

Non-functional settings

Any feature that requires a backend

## Final Goal

Create a premium, elegant, calming wellness application that feels like a real product ready for launch. Prioritise quality over quantity. Every feature must be polished, beautiful, intuitive, and fully functional using browser capabilities and Local Storage. Preserve only the colour palette, calming aesthetic, and breathing experience from the original AraNook, while redesigning everything else into a cohesive, modern, and genuinely useful wellness platform.