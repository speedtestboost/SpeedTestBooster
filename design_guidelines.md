# Design Guidelines: Speed Test & Network Diagnostics Platform

## Design Approach

**Selected Approach**: Reference-Based with Dark Theme Specialization

Drawing inspiration from Fast.com's minimalism combined with Speedtest.net's comprehensive diagnostics display, enhanced with a cyberpunk-influenced dark aesthetic. The purple/pink gradients create energy and technological sophistication while maintaining readability for data-heavy content.

**Key Design Principles**:
- Data clarity in dark environments
- Gradient accents as visual anchors, not noise
- Instant comprehension of test results
- Progressive information disclosure (simple→detailed)

## Typography

**Font Stack**:
- Primary: 'Inter' for UI and body text (Google Fonts)
- Display: 'Space Grotesk' for headlines and metrics (Google Fonts)
- Monospace: 'JetBrains Mono' for technical data and IP addresses (Google Fonts)

**Hierarchy**:
- Hero Display: Space Grotesk, 56px/64px, font-bold
- Speed Metrics: Space Grotesk, 72px/80px, font-extrabold (live test results)
- Section Headers: Space Grotesk, 32px/40px, font-semibold
- Body Text: Inter, 16px/24px, font-normal
- Technical Labels: JetBrains Mono, 14px/20px, font-medium
- Small Data: Inter, 14px/20px, font-normal

## Layout System

**Spacing Primitives**: Using Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24
- Micro spacing: p-2, gap-2 (component internals)
- Standard spacing: p-4, gap-4, m-6 (cards, sections)
- Section spacing: py-16, py-20, py-24 (vertical rhythm)
- Large breakpoints: gap-8, gap-12 (feature grids)

**Container Strategy**:
- Full-width sections: w-full with max-w-7xl mx-auto px-6
- Tight content: max-w-4xl for readability
- Test interface: max-w-2xl centered for focus

## Core Components

### Navigation
Fixed header with dark background (opacity 95%), blur backdrop, subtle bottom border with gradient. Logo left, language selector (flag icons + dropdown) and navigation links right. Mobile: hamburger menu with slide-in panel.

### Hero Section
**Large Hero Image**: YES
Full viewport height (h-screen) with dark cyberpunk-themed network visualization or abstract data flow imagery. Central speed test interface overlays image with frosted glass card effect. Primary "Start Test" button has blurred background (backdrop-blur-xl). Text legibility ensured with semi-transparent dark overlay on image (40% opacity).

### Speed Test Interface (Primary Feature)
Large circular progress indicator (280px diameter) displaying real-time speed. Center shows numerical value in massive Space Grotesk typography. Below circle: three metric cards in horizontal row showing Download/Upload/Ping with gradient borders. "Start Test" transforms to animated progress during testing.

### Results Dashboard
Post-test expanded view with 2-column grid (desktop) showing:
- Left: Historical graph (line chart) of past tests
- Right: Current session detailed metrics (latency, jitter, packet loss)
- Bottom: Server location map with connection path visualization

### Diagnostics Cards
Grid of 3 columns (lg) / 2 columns (md) / 1 column (mobile):
- IP Information card (public/local IP, ISP details)
- Network Quality card (connection type, signal strength)
- DNS Performance card (resolver speed, lookup times)
- Server Details card (test server location, latency breakdown)

Each card has dark background with subtle gradient border on hover, rounded-2xl corners.

### Language Switcher
Compact dropdown in header showing current language flag. Dropdown panel displays 5 languages: English (default), Spanish, Indonesian, Portuguese (BR), French (CA/FR separated). Each entry shows flag icon + native language name. Smooth transition between language versions without page reload where possible.

### Comparison Table
Multi-language pages follow identical structure. Section for "Test History" showing tabular data with sortable columns. Gradient header row, alternating row opacity for readability.

### Footer
3-column layout (desktop):
- Column 1: About section with tagline
- Column 2: Quick links (How It Works, FAQ, Privacy, Terms)
- Column 3: Language selection (repeated for accessibility) + social links

All in native language with consistent icon placement.

## Images

### Hero Image
**Description**: Dark, high-tech network visualization featuring abstract purple and pink gradient light trails representing data flow through fiber optic cables or network nodes. Bokeh effect with depth. Dark blue-black background (#0a0a1a approximate tone). Should convey speed, connectivity, and technology.

**Placement**: Full-width, full-height background for hero section with 40% dark overlay for text legibility.

### Optional Secondary Images
- Server location map (can use map library integration)
- Icon illustrations for diagnostic cards (use Heroicons for consistency)

## Gradient Application

**Primary Gradient**: Purple (#8b5cf6) to Pink (#ec4899) - used sparingly:
- Speed test circular progress fill
- Active state borders on cards
- Accent lines and separators
- Button hover states (subtle)
- Language switcher active indicator

**Background Treatments**:
- Base: Very dark navy (#0f0f1f to #1a1a2e)
- Cards: Slightly lighter (#1e1e2e)
- Overlays: Semi-transparent with backdrop blur

## Iconography

**Icon Library**: Heroicons (via CDN)
- Solid variants for primary actions
- Outline variants for navigation and labels
- Consistent 20px/24px sizing

**Key Icons**:
- Globe for language selection
- ArrowPath for refresh/retest
- SignalIcon for network strength
- ChartBarIcon for statistics
- ServerIcon for connection details

## Accessibility

- WCAG AAA contrast ratios for text on dark backgrounds (minimum 7:1)
- Language switcher keyboard navigable with clear focus states
- All interactive elements minimum 44px touch targets
- Loading states with both visual and text indicators
- Form inputs with visible labels and error states in high contrast

## Responsive Behavior

- Hero: Full height on desktop, 70vh on tablet, 60vh on mobile with larger test button
- Diagnostic cards: 3→2→1 column progression
- Test results: Stacked layout on mobile with scrollable graphs
- Language dropdown: Full-screen modal on mobile for better touch interaction
- Footer: Stacks to single column on mobile with centered alignment