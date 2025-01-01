# Royalty X

A comprehensive content and royalty management platform designed to help content producers track, manage, and analyze their revenue streams across multiple platforms.

## Current Implementation Status

### Completed Features
- User Management System
  - Role-based Access Control (RBAC)
  - User Profiles with Social Links
  - User Settings Management
  - Admin User Management Interface
  - User Role Management
- Admin Dashboard
  - Overview Statistics
  - Recent Users List
  - Recent Content List
  - System Alerts
  - Quick Actions
- Analytics System
  - User Analytics
    - Growth Trends
    - User Activity
    - Registration Stats
  - Revenue Analytics
    - Monthly Revenue
    - Growth Metrics
    - Trend Analysis
  - Content Analytics
    - Upload Statistics
    - Usage Metrics
    - Performance Data
  - Export Capabilities
    - Data Export
    - Custom Reports
    - CSV Downloads
```
royalty-x/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── admin/          # Admin dashboard components
│   │   ├── analytics/      # Analytics and charts
│   │   ├── auth/          # Authentication components
│   │   ├── content/       # Content management
│   │   ├── email/         # Email templates and components
│   │   ├── layout/        # Layout components
│   │   ├── producer/      # Producer-specific components
│   │   ├── revenue/       # Revenue tracking components
│   │   └── ui/           # Base UI components (buttons, inputs)
│   ├── pages/            # Next.js pages and API routes
│   ├── services/         # Business logic and API services
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   ├── types/            # TypeScript type definitions
│   └── styles/           # Global styles and themes
├── public/               # Static assets
└── docs/                # Project documentation
```

3. **Data Analysis**
   - Trend calculation
   - Moving averages
   - Statistical analysis
   - Data normalization
   - Gap filling
   - Outlier detection

## Analytics Dashboard

The analytics dashboard now features advanced visualization capabilities through customizable widgets:

- **Advanced Analytics Chart**: Interactive multi-purpose charting with support for various visualization types
- **Activity Heatmap**: Visualize temporal patterns and data intensity
- **Flow Analysis**: Sankey diagrams for relationship and flow analysis

These widgets can be easily added to both producer and admin dashboards through the widget catalog. For detailed information, see the [Analytics Documentation](docs/ANALYTICS.md).

## Analytics and Visualization

The platform includes advanced analytics and visualization capabilities:

1. **Interactive Dashboards**
   - Customizable widget system
   - Real-time data updates
   - Drag-and-drop layout customization
   - Widget templates for different metrics

2. **Visualization Components**
   - Advanced Analytics Chart
     - Multiple chart types (line, area, bar, scatter, radar)
     - Interactive tooltips and legends
     - Trendline visualization
   - Activity Heatmap
     - Temporal pattern visualization
     - Customizable color schemes
     - Interactive cell highlighting
   - Flow Analysis (Sankey)
     - Relationship and flow visualization
     - Interactive node/link highlighting
     - Automatic layout calculation

3. **Data Processing**
   - Automatic data transformation
   - Real-time updates
   - Error handling and validation
   - Custom metric calculations

4. **Integration**
   - Seamless widget integration
   - Custom data sources
   - Real-time data streaming
   - Export capabilities

For detailed documentation on analytics and visualization features, see [Analytics Documentation](docs/ANALYTICS.md).

## Dashboard Templates

The platform offers several pre-built dashboard templates:

1. **Update View**
   - Quick access to updates, messages, and features
   - Real-time performance metrics
   - Notification preference management
   - Admin message scheduling (admin version)
   - Interactive data visualizations

2. **Analytics View**
   - Comprehensive analytics dashboard
   - Multiple visualization options
   - Custom metric tracking
   - Export capabilities

3. **Content Management**
   - Content upload and management
   - Metadata editing
   - Performance tracking
   - Distribution controls

For detailed documentation on dashboard templates and features, see [Analytics Documentation](docs/ANALYTICS.md).

## API Documentation

### Overview
The RoyaltyX API is built with a standardized structure focusing on consistency, security, and ease of use. The API follows RESTful principles and uses JSON for request and response payloads.

### API Versioning
All API endpoints are versioned using URL path versioning:
```
/api/v1/[resource]
```

### Authentication
The API uses JWT Bearer token authentication:
```
Authorization: Bearer <token>
```

### Request Validation
All API requests are validated using Zod schemas. Invalid requests will return a 400 Bad Request with detailed validation errors.

### Response Format
All API responses follow a standard format:
```json
{
  "success": boolean,
  "data": any,
  "message": string,
  "meta": {
    "page": number,
    "limit": number,
    "total": number
  }
}
```

### Error Handling
Errors follow a consistent format:
```json
{
  "success": false,
  "message": string
}
```

Common HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

### API Documentation
Interactive API documentation is available at `/api/docs` when running in development mode.

### Rate Limiting
API requests are rate-limited to prevent abuse. Limits are configured per endpoint and authentication status.

## License

Private - All rights reserved

## Features

### AI Services
- **Service Management**
  - Toggle services on/off
  - Configure producer access
  - Monitor usage and performance
  - Real-time analytics

- **Configuration System**
  - In-memory caching (5-minute TTL)
  - Version-based invalidation
  - Batch updates
  - Error resilience

- **Usage Tracking**
  - API call monitoring
  - Token consumption
  - Response times
  - Success rates
  - User patterns

### Admin Dashboard
- Service management interface
- Usage analytics
- Performance metrics
- User activity tracking

## Development

### AI Service Development
```typescript
// Example: Using AI Service with caching
import { aiService } from '@/services/ai.service';
import { aiConfigService } from '@/services/ai-config.service';

// Check service access
const hasAccess = await aiConfigService.checkServiceAccess('content-analysis', producerId);

// Use service with automatic usage tracking
if (hasAccess) {
  const analysis = await aiService.analyzeContent(content, producerId);
}
```

### Usage Analytics
```typescript
import { aiUsageService } from '@/services/ai-usage.service';

// Get service usage stats
const stats = await aiUsageService.getServiceUsage('content-analysis', 30); // last 30 days

// Get user usage patterns
const userStats = await aiUsageService.getUserUsage(userId, 7); // last 7 days
```

## Request Templates

The Request Template system streamlines the access request process by providing pre-configured templates for common access patterns.

### Features

#### Template Management
- Create and manage request templates
- Public and private templates
- Template categories and tags
- Default expiration periods
- Template search functionality

#### Template Components
```typescript
// Create a template
const template = await templateService.create({
  name: 'Analytics Access',
  description: 'Request access to view analytics data',
  permissions: ['view_analytics', 'view_content'],
  message: 'I would like to access analytics data for content optimization.',
  defaultExpirationDays: 30,
  isPublic: true,
  tags: ['analytics', 'reporting']
});

// Use a template in access request
const request = await accessRequestService.createFromTemplate(templateId, {
  producerId: 'producer-id',
  // Override template defaults if needed
  message: 'Custom message...',
  expirationDate: new Date('2024-12-31')
});
```

### Template Structure

#### Request Template
```typescript
interface RequestTemplate {
  id: string;
  name: string;
  description: string;
  permissions: SharedAccessPermission[];
  message: string;
  defaultExpirationDays?: number;
  createdAt: Date;
  updatedAt: Date;
  createdById: string;
  createdByName: string;
  isPublic: boolean;
  category?: string;
  tags?: string[];
}
```

### Components

#### RequestTemplateManager
- Template creation and management interface
- Template listing and deletion
- Public/private template toggle
- Template search and filtering


## Dashboard Metrics and Analytics

The dashboard includes comprehensive metrics and analytics features that integrate with Firestore for real-time data visualization.

### Firestore Data Structure

The metrics data is stored in the following collections:

```
metrics/
  ├── [documentId]/
  │   ├── timestamp: Timestamp
  │   ├── type: string ('impressions' | 'rentals' | 'sales' | 'streaming')
  │   ├── impressions: number
  │   ├── rentals: number
  │   ├── rentalRevenue: number
  │   ├── sales: number
  │   ├── salesRevenue: number
  │   └── streamingMinutes: number
```

### Available Widgets

1. Impressions Widget
   - Track content views and engagement metrics
   - View total and average impressions
   - Toggle between chart and table views
   - Customizable time periods

2. Rentals Widget
   - Monitor rental transactions and revenue
   - View total rentals, revenue, and average revenue per rental
   - Bar chart visualization with dual axes
   - Detailed tabular data view

3. Sales Widget
   - Track sales performance and revenue
   - View total sales, revenue, and average order value
   - Line chart visualization with dual axes
   - Detailed breakdown in table format

4. Life-to-Date (LTD) Totals Widget
   - Comprehensive view of all metrics across time periods
   - Summary and detailed views
   - Revenue distribution analysis
   - Performance indicators and trends

### Time Period Selection

All widgets support the following time ranges:
- Last 7 Days
- Last 30 Days
- Last 90 Days
- Year to Date
- Custom Date Range

The analytics system provides comprehensive insights into platform performance, user engagement, and revenue metrics.

### Key Components

1. **Performance Metrics**
```typescript
interface PerformanceMetrics {
  totalViews: number;
  totalRevenue: number;
  totalContent: number;
  activeProducers: number;
  averageViewDuration: number;
  completionRate: number;
  dailyMetrics: Array<{
    date: string;
    views: number;
    revenue: number;
    newContent: number;
    activeProducers: number;
  }>;
}
```

2. **Revenue Analytics**
```typescript
interface RevenueAnalytics {
  totalRevenue: number;
  revenueByType: {
    subscriptions: number;
    oneTimePurchases: number;
    rentals: number;
    tips: number;
  };
  revenueByCategory: Record<string, number>;
  topProducers: Array<{
    producerId: string;
    producerName: string;
    revenue: number;
    content: number;
  }>;
  revenueOverTime: Array<{
    date: string;
    subscriptions: number;
    oneTimePurchases: number;
    rentals: number;
    tips: number;
  }>;
}
```

3. **Content Analytics**
```typescript
interface ContentAnalytics {
  totalContent: number;
  contentByType: Record<string, number>;
  contentByCategory: Record<string, number>;
  topContent: Array<{
    contentId: string;
    title: string;
    producer: string;
    views: number;
    revenue: number;
    rating: number;
  }>;
  contentMetrics: Array<{
    date: string;
    uploads: number;
    views: number;
    completions: number;
  }>;
}
```

4. **Engagement Analytics**
```typescript
interface EngagementAnalytics {
  activeUsers: number;
  newUsers: number;
  returningUsers: number;
  averageSessionDuration: number;
  engagementByPlatform: Record<string, number>;
  engagementByRegion: Record<string, number>;
  userJourney: {
    acquisition: Record<string, number>;
    activation: Record<string, number>;
    retention: Record<string, number>;
  };
  engagementTrends: Array<{
    date: string;
    activeUsers: number;
    newUsers: number;
    returningUsers: number;
    averageEngagement: number;
  }>;
}
```

5. **Custom Reports**
```typescript
interface CustomReport {
  id: string;
  name: string;
  description: string;
  metrics: string[];
  filters: Array<{
    field: string;
    operator: 'equals' | 'contains' | 'greaterThan' | 'lessThan';
    value: any;
  }>;
  groupBy: string[];
  timeRange: TimeRange;
  schedule?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    recipients: string[];
    lastSent?: Date;
  };
}
```

### Usage Examples

1. **Fetching Analytics Data**
```typescript
// Get performance metrics
const performance = await analyticsService.getPerformanceMetrics({
  start: new Date('2024-01-01'),
  end: new Date('2024-12-31')
});

// Get revenue analytics
const revenue = await analyticsService.getRevenueAnalytics({
  start: new Date('2024-01-01'),
  end: new Date('2024-12-31')
});

// Get content analytics
const content = await analyticsService.getContentAnalytics({
  start: new Date('2024-01-01'),
  end: new Date('2024-12-31')
});

// Get engagement analytics
const engagement = await analyticsService.getEngagementAnalytics({
  start: new Date('2024-01-01'),
  end: new Date('2024-12-31')
});
```

2. **Creating Custom Reports**
```typescript
// Create a custom report
const reportId = await analyticsService.createCustomReport({
  name: 'Monthly Revenue Report',
  description: 'Detailed revenue breakdown by content type',
  metrics: ['revenue', 'views', 'completions'],
  filters: [
    {
      field: 'contentType',
      operator: 'equals',
      value: 'video'
    }
  ],
  groupBy: ['month', 'category'],
  timeRange: {
    start: new Date('2024-01-01'),
    end: new Date('2024-12-31')
  },
  schedule: {
    frequency: 'monthly',
    recipients: ['admin@example.com']
  }
});

// Generate report
const report = await analyticsService.generateCustomReport(reportId);
```

## Analytics Integration

### Overview
The analytics system provides comprehensive insights into platform performance, user engagement, and revenue metrics.

### Key Components

1. **Performance Metrics**
```typescript
interface PerformanceMetrics {
  totalViews: number;
  totalRevenue: number;
  totalContent: number;
  activeProducers: number;
  averageViewDuration: number;
  completionRate: number;
  dailyMetrics: Array<{
    date: string;
    views: number;
    revenue: number;
    newContent: number;
    activeProducers: number;
  }>;
}
```

2. **Revenue Analytics**
```typescript
interface RevenueAnalytics {
  totalRevenue: number;
  revenueByType: {
    subscriptions: number;
    oneTimePurchases: number;
    rentals: number;
    tips: number;
  };
  revenueByCategory: Record<string, number>;
  topProducers: Array<{
    producerId: string;
    producerName: string;
    revenue: number;
    content: number;
  }>;
  revenueOverTime: Array<{
    date: string;
    subscriptions: number;
    oneTimePurchases: number;
    rentals: number;
    tips: number;
  }>;
}
```

3. **Content Analytics**
```typescript
interface ContentAnalytics {
  totalContent: number;
  contentByType: Record<string, number>;
  contentByCategory: Record<string, number>;
  topContent: Array<{
    contentId: string;
    title: string;
    producer: string;
    views: number;
    revenue: number;
    rating: number;
  }>;
  contentMetrics: Array<{
    date: string;
    uploads: number;
    views: number;
    completions: number;
  }>;
}
```

4. **Engagement Analytics**
```typescript
interface EngagementAnalytics {
  activeUsers: number;
  newUsers: number;
  returningUsers: number;
  averageSessionDuration: number;
  engagementByPlatform: Record<string, number>;
  engagementByRegion: Record<string, number>;
  userJourney: {
    acquisition: Record<string, number>;
    activation: Record<string, number>;
    retention: Record<string, number>;
  };
  engagementTrends: Array<{
    date: string;
    activeUsers: number;
    newUsers: number;
    returningUsers: number;
    averageEngagement: number;
  }>;
}
```

5. **Custom Reports**
```typescript
interface CustomReport {
  id: string;
  name: string;
  description: string;
  metrics: string[];
  filters: Array<{
    field: string;
    operator: 'equals' | 'contains' | 'greaterThan' | 'lessThan';
    value: any;
  }>;
  groupBy: string[];
  timeRange: TimeRange;
  schedule?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    recipients: string[];
    lastSent?: Date;
  };
}
```

### Usage Examples

1. **Fetching Analytics Data**
```typescript
// Get performance metrics
const performance = await analyticsService.getPerformanceMetrics({
  start: new Date('2024-01-01'),
  end: new Date('2024-12-31')
});

// Get revenue analytics
const revenue = await analyticsService.getRevenueAnalytics({
  start: new Date('2024-01-01'),
  end: new Date('2024-12-31')
});

// Get content analytics
const content = await analyticsService.getContentAnalytics({
  start: new Date('2024-01-01'),
  end: new Date('2024-12-31')
});

// Get engagement analytics
const engagement = await analyticsService.getEngagementAnalytics({
  start: new Date('2024-01-01'),
  end: new Date('2024-12-31')
});
```

2. **Creating Custom Reports**
```typescript
// Create a custom report
const reportId = await analyticsService.createCustomReport({
  name: 'Monthly Revenue Report',
  description: 'Detailed revenue breakdown by content type',
  metrics: ['revenue', 'views', 'completions'],
  filters: [
    {
      field: 'contentType',
      operator: 'equals',
      value: 'video'
    }
  ],
  groupBy: ['month', 'category'],
  timeRange: {
    start: new Date('2024-01-01'),
    end: new Date('2024-12-31')
  },
  schedule: {
    frequency: 'monthly',
    recipients: ['admin@example.com']
  }
});

// Generate report
const report = await analyticsService.generateCustomReport(reportId);
```

## Technologies Used

- Next.js
- TypeScript
- Firebase
  - Authentication
  - Firestore
  - Storage
- Tailwind CSS
- shadcn/ui
- Recharts (for analytics)
- Zustand (state management)
- React Dropzone (file upload)
- React Intersection Observer (infinite scroll)
- Lucide React (icons)
- date-fns (date formatting)

## Features

### Authentication
- Email/Password Authentication
- Role-based Access Control (Admin/Producer)
- Protected Routes
- Authentication State Management
- User Registration
- Login System

### User Management
- Role-based Access Control (RBAC)
  - Granular Permissions System
  - Permission-based Component Rendering
  - Protected Routes
- User Profiles
  - Basic Information
  - Social Links
  - Bio Management
- User Settings
  - Email Notifications
  - Theme Preferences
  - Language Settings
- Admin Interface
  - User List with Filtering
  - User Creation
  - User Editing
  - User Deletion
  - Role Management

### Admin Dashboard
- Overview Statistics
  - Active Users Count
  - Total Content
  - Monthly Revenue
  - System Alerts
- Recent Activity
  - New User Registrations
  - Content Uploads
  - System Events
- Quick Actions
  - User Management
  - Content Management
  - System Settings

### Analytics
- User Analytics
  - Growth Trends
  - User Activity
  - Registration Stats
- Revenue Analytics
  - Monthly Revenue
  - Growth Metrics
  - Trend Analysis
- Content Analytics
  - Upload Statistics
  - Usage Metrics
  - Performance Data
- Export Capabilities
  - Data Export
  - Custom Reports
  - CSV Downloads

### Analytics System
- Producer Analytics Dashboard
  - Overview Tab
    - Revenue by Type (Sales/Rentals/Streaming)
    - Platform Distribution
    - Top Performing Content
  - Revenue Analytics
    - Revenue Trends
    - Platform-specific Revenue
    - Content Type Revenue
  - Audience Analytics
    - Demographics
    - Geographic Distribution
    - Viewing Patterns
  - Engagement Metrics
    - Watch Time
    - Completion Rates
    - User Interactions
  - Advanced Features
    - Date Range Filtering
    - Content Selection
    - Platform Filtering
    - Interactive Visualizations
      - Line Charts
      - Bar Charts
      - Pie Charts
      - Data Tables
    - Real-time Updates
    - Custom Metric Builder
    - Comparative Analysis
    - Data Export

### Analytics Data Structure

#### Revenue Metrics Schema
```typescript
RevenueMetrics {
  id: string;
  contentId: string;
  platformId: string;
  date: Date;
  sales: {
    count: number;
    revenue: number;
    currency: string;
  };
  rentals: {
    count: number;
    revenue: number;
    currency: string;
  };
  streaming: {
    views: number;
    revenue: number;
    currency: string;
  };
}
```

#### Audience Metrics Schema
```typescript
AudienceMetrics {
  id: string;
  contentId: string;
  date: Date;
  demographics: {
    ageRanges: Record<string, number>;
    gender: Record<string, number>;
  };
  geography: {
    country: string;
    region: string;
    city: string;
    count: number;
  }[];
}
```

#### Engagement Metrics Schema
```typescript
EngagementMetrics {
  id: string;
  contentId: string;
  date: Date;
  watchTime: {
    totalMinutes: number;
    averageMinutesPerView: number;
    completionRate: number;
  };
  interactions: {
    likes: number;
    shares: number;
    comments: number;
    saves: number;
  };
  retention: {
    day1: number;
    day7: number;
    day30: number;
  };
}
```

#### Content Performance Schema
```typescript
ContentPerformance {
  id: string;
  contentId: string;
  title: string;
  type: 'movie' | 'series' | 'short' | 'documentary';
  metrics: {
    totalViews: number;
    totalRevenue: number;
    averageRating: number;
    engagementScore: number;
  };
  platforms: {
    platformId: string;
    name: string;
    views: number;
    revenue: number;
  }[];
}
```

#### Analytics Filter Schema
```typescript
AnalyticsFilter {
  dateRange: {
    startDate: Date;
    endDate: Date;
  };
  contentIds?: string[];
  platformIds?: string[];
  metrics?: Array<'revenue' | 'audience' | 'engagement'>;
  granularity: 'day' | 'week' | 'month' | 'year';
}
```

#### Custom Metric Schema
```typescript
CustomMetric {
  id: string;
  producerId: string;
  name: string;
  description: string;
  formula: string;
  parameters: Array<{
    name: string;
    path: string;
    type: 'number' | 'percentage' | 'currency';
  }>;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

#### Data Relationships
- Each `RevenueMetrics` entry is associated with a specific content item and platform
- `AudienceMetrics` track viewer demographics and geographic distribution
- `EngagementMetrics` measure user interaction and content performance
- `ContentPerformance` provides an overview of content success across platforms
- `CustomMetric` allows producers to create personalized performance indicators

#### Data Storage
- Metrics are stored in Firebase Firestore collections
- Real-time updates are enabled for live analytics
- Historical data is archived for trend analysis
- Aggregated metrics are cached for performance

#### Data Access Patterns
- Producers can access analytics for their content only
- Data is queried based on date ranges and filters
- Real-time updates for current metrics
- Batch processing for historical data
- Aggregated views for dashboard displays

### Communication System

### Overview
The communication system in Royalty X provides comprehensive email and SMS notifications, enabling real-time updates for both users and producers. The system integrates with Twilio for SMS delivery and includes features for user preference management and verification.

### Core Components

#### 1. Email Management
- Template-based notifications
- Customizable content
- HTML/Plain text support
- Rich formatting options
- Dynamic content insertion
- Localization support

#### 2. SMS Notifications

1. General Features
   - Phone verification
   - Preference management
   - Daily message limits
   - Rate limiting
   - Error handling
   - Delivery tracking

2. Producer-Specific Features
   - Revenue updates
   - Content performance metrics
   - Streaming milestones
   - Royalty payment notifications
   - Bulk notification support
   - Custom filtering options

3. Message Categories
   - System notifications
   - Financial alerts
   - Content updates
   - Security notices
   - Custom notifications

#### 3. Producer Data Integration

1. Revenue Tracking
   ```typescript
   interface RevenueData {
     amount: number;
     period: string;
     streams: number;
     trend: 'up' | 'down' | 'stable';
     percentageChange: number;
   }
   ```

2. Content Performance
   ```typescript
   interface ContentMetrics {
     contentId: string;
     title: string;
     streams: number;
     revenue: number;
     engagement: {
       likes: number;
       shares: number;
       comments: number;
     };
   }
   ```

3. Payment Processing
   ```typescript
   interface PaymentUpdate {
     paymentId: string;
     amount: number;
     status: 'pending' | 'processed' | 'completed';
     estimatedArrival: Date;
   }
   ```

### Implementation Details

#### 1. Services

1. SMS Service
   - Phone verification
   - Preference management
   - Message sending
   - Rate limiting
   - Analytics tracking

2. Producer Service
   - Data collection
   - Performance metrics
   - Revenue tracking
   - Payment processing
   - Milestone monitoring

3. Analytics Service
   - Engagement tracking
   - Performance metrics
   - Revenue analytics
   - Trend analysis
   - Report generation

#### 2. Components

1. User Interface
   ```typescript
   interface NotificationPreferences {
     sms: {
       enabled: boolean;
       phoneNumber: string;
       verified: boolean;
       categories: {
         [key: string]: boolean;
       };
     };
     email: {
       enabled: boolean;
       frequency: 'instant' | 'daily' | 'weekly';
       categories: {
         [key: string]: boolean;
       };
     };
   }
   ```

2. Producer Dashboard
   ```typescript
   interface DashboardMetrics {
     revenue: {
       total: number;
       trend: number;
       projections: number[];
     };
     content: {
       totalStreams: number;
       activeContent: number;
       topPerformers: ContentMetrics[];
     };
     notifications: {
       unread: number;
       recent: NotificationHistory[];
     };
   }
   ```

### Security Features

1. Data Protection
   - End-to-end encryption
   - Secure storage
   - Access control
   - Audit logging
   - Rate limiting

2. Compliance
   - GDPR compliance
   - Data retention
   - User consent
   - Privacy controls
   - Documentation

### Usage Examples

1. Send Revenue Update
```typescript
const smsService = new SMSService();

await smsService.sendProducerNotification(producerId, 'revenue', {
  amount: 1500.75,
  period: '24 hours',
  streams: 10000,
});
```

2. Send Bulk Notifications
```typescript
await smsService.sendBulkProducerNotifications('milestone', {
  minRevenue: 1000,
  minStreams: 5000,
});
```

3. Update Preferences
```typescript
await smsService.updatePreferences(userId, {
  preferences: {
    revenueUpdates: true,
    contentPerformance: true,
    streamingMilestones: true,
    royaltyPayments: true,
  },
});
```

### Testing

1. Development Tools
   - SMS testing interface
   - Producer notification testing
   - Bulk message testing
   - Preference management
   - Error simulation

2. Test Environment
   - Separate credentials
   - Sandbox mode
   - Rate limit testing
   - Error handling
   - Performance testing

### Configuration

1. Environment Variables
```env
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=your_twilio_number
TWILIO_VERIFY_SERVICE_ID=your_verify_service_id
```

2. Feature Flags
```typescript
const CONFIG = {
  sms: {
    enabled: true,
    dailyLimit: 5,
    verificationRequired: true,
    bulkEnabled: true,
  },
  producer: {
    minRevenueThreshold: 1000,
    minStreamsThreshold: 5000,
    autoNotifications: true,
  },
};
```

### Best Practices

1. Message Management
   - Clear, concise content
   - Personalization
   - Rate limiting
   - Error handling
   - Analytics tracking

2. Producer Communication
   - Relevant updates
   - Performance insights
   - Revenue tracking
   - Payment notifications
   - Milestone alerts

3. System Health
   - Monitor usage
   - Track errors
   - Analyze patterns
   - Optimize delivery
   - Update templates

### Communication System

### Overview
The communication system in Royalty X provides comprehensive email management, analytics, and preference controls. It enables personalized communication with users while maintaining detailed engagement tracking and analytics.

### Core Components

#### 1. Email Preferences Management

1. Preference Controls
   - Granular notification settings
   - Category-based subscriptions
   - Frequency management
   - Custom schedule options
   - One-click unsubscribe

2. User Interface
   - Clean, intuitive controls
   - Real-time preference updates
   - Mobile-responsive design
   - Accessibility features
   - Instant feedback

3. Security Features
   - Encrypted preferences
   - GDPR compliance
   - Audit logging
   - Access controls
   - Data protection

#### 2. Email Analytics

1. Engagement Metrics
   - Open rates & trends
   - Click-through analysis
   - Bounce rate tracking
   - Complaint monitoring
   - Unsubscribe analytics
   - Device breakdown

2. Time-based Analysis
   - Peak engagement times
   - Day-of-week patterns
   - Response latency
   - Seasonal trends
   - Custom date ranges
   - Comparative analysis

3. Category Analytics
   - Content performance
   - Template effectiveness
   - Topic engagement
   - A/B test results
   - User segment analysis

#### 3. Schedule Management

1. Frequency Options
   - Instant delivery
   - Daily digests
   - Weekly summaries
   - Monthly reports
   - Custom schedules
   - Time zone support

2. History Tracking
   - Change timeline
   - Modification reasons
   - Duration analysis
   - Pattern recognition
   - Impact assessment

3. Schedule Analytics
   - Delivery success rates
   - Optimal timing analysis
   - User preference patterns
   - Schedule effectiveness
   - Automation insights

### Technical Implementation

#### 1. Services

1. EmailPreferencesService

```

Follow these instructions to make the following change to my code document.

Instruction: Adding analytics and visualization section to README

Code Edit:
```
{{ ... }}

## Analytics and Visualization

### Advanced Charts
The platform includes a comprehensive analytics system with advanced data visualization capabilities:

1. **Interactive Charts**
   - Line charts with trendlines
   - Area charts for distributions
   - Bar charts for comparisons
   - Scatter plots for correlations
   - Radar charts for multi-metric analysis
   - Heatmaps for time-based patterns
   - Sankey diagrams for flow analysis

2. **Features**
   - Interactive tooltips
   - Custom color schemes
   - Responsive layouts
   - Click handlers
   - Hover effects
   - Value formatting
   - Data export

3. **Data Analysis**
   - Trend calculation
   - Moving averages
   - Statistical analysis
   - Data normalization
   - Gap filling
   - Outlier detection

4. **Integration**
   ```typescript
   // Performance dashboard with multiple visualizations
   function AnalyticsDashboard() {
     return (
       <div className="grid gap-4">
         <AdvancedChart
           data={performanceData}
           title="Performance Metrics"
           type="line"
           metrics={['views', 'engagement']}
           showTrendline={true}
         />
         
         <div className="grid md:grid-cols-2 gap-4">
           <Heatmap
             data={activityData}
             title="User Activity"
             colorScheme="purple"
           />
           
           <SankeyChart
             data={revenueFlow}
             title="Revenue Distribution"
           />
         </div>
       </div>
     );
   }
   ```

For detailed documentation on analytics and visualization features, see [Analytics Documentation](docs/ANALYTICS.md).

{{ ... }}

```

Follow these instructions to make the following change to my code document.

Instruction: Updating README with new visualization widget information

Code Edit:
```
{{ ... }}

### Analytics Dashboard

The analytics dashboard now features advanced visualization capabilities through customizable widgets:

- **Advanced Analytics Chart**: Interactive multi-purpose charting with support for various visualization types
- **Activity Heatmap**: Visualize temporal patterns and data intensity
- **Flow Analysis**: Sankey diagrams for relationship and flow analysis

These widgets can be easily added to both producer and admin dashboards through the widget catalog. For detailed information, see the [Analytics Documentation](docs/ANALYTICS.md).

{{ ... }}

```

Follow these instructions to make the following change to my code document.

Instruction: Updating README with accurate visualization information

Code Edit:
```
{{ ... }}

### Analytics and Visualization

The platform includes advanced analytics and visualization capabilities:

1. **Interactive Dashboards**
   - Customizable widget system
   - Real-time data updates
   - Drag-and-drop layout customization
   - Widget templates for different metrics

2. **Visualization Components**
   - Advanced Analytics Chart
     - Multiple chart types (line, area, bar, scatter, radar)
     - Interactive tooltips and legends
     - Trendline visualization
   - Activity Heatmap
     - Temporal pattern visualization
     - Customizable color schemes
     - Interactive cell highlighting
   - Flow Analysis (Sankey)
     - Relationship and flow visualization
     - Interactive node/link highlighting
     - Automatic layout calculation

3. **Data Processing**
   - Automatic data transformation
   - Real-time updates
   - Error handling and validation
   - Custom metric calculations

4. **Integration**
   - Seamless widget integration
   - Custom data sources
   - Real-time data streaming
   - Export capabilities

For detailed documentation on analytics and visualization features, see [Analytics Documentation](docs/ANALYTICS.md).

{{ ... }}

```

Follow these instructions to make the following change to my code document.

Instruction: Adding Update View template information to README

Code Edit:
```
{{ ... }}

### Dashboard Templates

The platform offers several pre-built dashboard templates:

1. **Update View**
   - Quick access to updates, messages, and features
   - Real-time performance metrics
   - Notification preference management
   - Admin message scheduling (admin version)
   - Interactive data visualizations

2. **Analytics View**
   - Comprehensive analytics dashboard
   - Multiple visualization options
   - Custom metric tracking
   - Export capabilities

3. **Content Management**
   - Content upload and management
   - Metadata editing
   - Performance tracking
   - Distribution controls

For detailed documentation on dashboard templates and features, see [Analytics Documentation](docs/ANALYTICS.md).

{{ ... }}

```

Follow these instructions to make the following change to my code document.

Instruction: Adding new features and security updates to README

Code Edit:
```
{{ ... }}

## Features

### Producer Dashboard
- **Update View Template**
  - Quick access to updates and messages
  - Real-time performance metrics
  - Interactive data visualizations
  - AI-powered FAQ system

### Security & Privacy
- **Revenue Data Protection**
  - Project-level access control
  - Secure data filtering
  - Public/private data separation
  - Authorization validation

- **User Data Privacy**
  - Protected analytics
  - Secure API endpoints
  - Audit logging
  - Error prevention

### Data Access Control
- **Producer Access**
  - Access to authorized projects only
  - Public data visibility
  - Common media source information
  - Protected user data

### AI Integration
- **Smart FAQ System**
  - Real-time search
  - Context-aware responses
  - Feedback system
  - Category organization


### For Producers
- Content management and distribution
- Revenue tracking and analytics
- Audience engagement metrics
- **AI-powered predictions and insights**
  - Revenue forecasting
  - Engagement predictions
  - Content performance analysis
  - Audience growth projections
  - Market trend analysis
  - Pricing optimization
- Smart notifications and alerts
{{ ... }}

### For Administrators
- Platform-wide analytics
- User management
- Content moderation
- **AI-powered platform insights**
  - Platform-wide revenue predictions
  - Global engagement forecasts
  - Content trend analysis
  - Market opportunity identification
  - Pricing strategy optimization
- System configuration
{{ ... }}

```

Follow these instructions to make the following change to my code document.

Instruction: Adding section about recent Content Service improvements