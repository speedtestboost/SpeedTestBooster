import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, Upload, Zap, Cpu, Smartphone, MapPin, Shield, Settings,
  CheckCircle, AlertCircle, Clock, ChevronRight, Gauge
} from 'lucide-react';
import { OptimizationReport as OptimizationReportType, OptimizationSuggestion } from '@/lib/wifiOptimization';

interface OptimizationReportProps {
  report: OptimizationReportType;
  onClose: () => void;
}

const iconMap = {
  TrendingUp,
  Upload,
  Zap,
  Cpu,
  Smartphone,
  MapPin,
  Shield,
  Settings,
  Gauge
};

const priorityColors = {
  high: 'bg-red-500',
  medium: 'bg-yellow-500',
  low: 'bg-green-500'
};

const difficultyColors = {
  easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
};

export default function OptimizationReport({ report, onClose }: OptimizationReportProps) {
  const [selectedSuggestion, setSelectedSuggestion] = useState<OptimizationSuggestion | null>(null);
  const [completedSteps, setCompletedSteps] = useState<{ [key: string]: boolean[] }>({});

  const toggleStep = (suggestionId: string, stepIndex: number) => {
    setCompletedSteps(prev => ({
      ...prev,
      [suggestionId]: {
        ...prev[suggestionId],
        [stepIndex]: !prev[suggestionId]?.[stepIndex]
      }
    }));
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600 dark:text-green-400';
    if (score >= 70) return 'text-yellow-600 dark:text-yellow-400';
    if (score >= 50) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 85) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 50) return 'Fair';
    return 'Poor';
  };

  const categorizedSuggestions = report.suggestions.reduce((acc, suggestion) => {
    if (!acc[suggestion.category]) acc[suggestion.category] = [];
    acc[suggestion.category].push(suggestion);
    return acc;
  }, {} as Record<string, OptimizationSuggestion[]>);

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background border border-border rounded-xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl gradient-bg">
                <Gauge className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold gradient-text">WiFi Optimization Report</h2>
                <p className="text-muted-foreground">Personalized recommendations for your network</p>
              </div>
            </div>
            <Button variant="ghost" onClick={onClose} className="shrink-0">
              ✕
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Overview Scores */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Overall Score</p>
                    <p className={`text-2xl font-bold ${getScoreColor(report.overallScore)}`}>
                      {report.overallScore}/100
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {getScoreLabel(report.overallScore)}
                    </p>
                  </div>
                  <div className="w-16 h-16">
                    <Progress value={report.overallScore} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Network Score</p>
                    <p className={`text-2xl font-bold ${getScoreColor(report.networkScore)}`}>
                      {report.networkScore}/100
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {getScoreLabel(report.networkScore)}
                    </p>
                  </div>
                  <div className="w-16 h-16">
                    <Progress value={report.networkScore} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Device Score</p>
                    <p className={`text-2xl font-bold ${getScoreColor(report.deviceScore)}`}>
                      {report.deviceScore}/100
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {getScoreLabel(report.deviceScore)}
                    </p>
                  </div>
                  <div className="w-16 h-16">
                    <Progress value={report.deviceScore} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <p className="text-foreground leading-relaxed">{report.summary}</p>
            </CardContent>
          </Card>

          {/* Suggestions */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="all">All ({report.suggestions.length})</TabsTrigger>
              <TabsTrigger value="network">Network</TabsTrigger>
              <TabsTrigger value="hardware">Hardware</TabsTrigger>
              <TabsTrigger value="software">Software</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {report.suggestions.map((suggestion) => (
                <SuggestionCard
                  key={suggestion.id}
                  suggestion={suggestion}
                  completedSteps={completedSteps[suggestion.id] || []}
                  onToggleStep={(stepIndex) => toggleStep(suggestion.id, stepIndex)}
                  isExpanded={selectedSuggestion?.id === suggestion.id}
                  onToggleExpand={() => setSelectedSuggestion(
                    selectedSuggestion?.id === suggestion.id ? null : suggestion
                  )}
                />
              ))}
            </TabsContent>

            {Object.entries(categorizedSuggestions).map(([category, suggestions]) => (
              <TabsContent key={category} value={category} className="space-y-4">
                {suggestions.map((suggestion) => (
                  <SuggestionCard
                    key={suggestion.id}
                    suggestion={suggestion}
                    completedSteps={completedSteps[suggestion.id] || []}
                    onToggleStep={(stepIndex) => toggleStep(suggestion.id, stepIndex)}
                    isExpanded={selectedSuggestion?.id === suggestion.id}
                    onToggleExpand={() => setSelectedSuggestion(
                      selectedSuggestion?.id === suggestion.id ? null : suggestion
                    )}
                  />
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}

interface SuggestionCardProps {
  suggestion: OptimizationSuggestion;
  completedSteps: boolean[];
  onToggleStep: (stepIndex: number) => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

function SuggestionCard({ 
  suggestion, 
  completedSteps, 
  onToggleStep, 
  isExpanded, 
  onToggleExpand 
}: SuggestionCardProps) {
  const IconComponent = iconMap[suggestion.icon as keyof typeof iconMap] || Settings;
  const completedCount = completedSteps.filter(Boolean).length;
  const progressPercentage = suggestion.steps.length > 0 
    ? (completedCount / suggestion.steps.length) * 100 
    : 0;

  return (
    <Card className="card-hover cursor-pointer" onClick={onToggleExpand}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-lg bg-muted">
              <IconComponent className="h-5 w-5 text-foreground" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <CardTitle className="text-lg">{suggestion.title}</CardTitle>
                <div className={`w-3 h-3 rounded-full ${priorityColors[suggestion.priority]}`} />
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                {suggestion.description}
              </p>
              <div className="flex items-center space-x-2 text-xs">
                <Badge variant="secondary" className={difficultyColors[suggestion.difficulty]}>
                  {suggestion.difficulty}
                </Badge>
                <span className="text-muted-foreground">
                  Impact: {suggestion.impact}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-primary">
              {suggestion.estimatedImprovement}
            </span>
            <ChevronRight className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-0">
          <div className="space-y-4">
            {/* Progress */}
            <div className="bg-muted/30 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm text-muted-foreground">
                  {completedCount}/{suggestion.steps.length} steps
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>

            {/* Steps */}
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Implementation Steps:</h4>
              {suggestion.steps.map((step, index) => (
                <div 
                  key={index}
                  className="flex items-start space-x-3 p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleStep(index);
                  }}
                >
                  <div className="mt-0.5">
                    {completedSteps[index] ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm ${completedSteps[index] ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                      {step}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Expected Impact */}
            <div className="bg-primary/10 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Expected Improvement</span>
              </div>
              <p className="text-sm text-foreground">{suggestion.estimatedImprovement}</p>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}