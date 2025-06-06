import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, Plus, Trash2, User, Code, Lightbulb, Settings, MoreHorizontal, Brain, Zap, Target, Activity, TrendingUp, Users, Clock, Filter, Star, Bookmark, ChevronRight, Shield } from 'lucide-react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  type?: 'text' | 'code' | 'thinking' | 'analysis';
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  category?: 'general' | 'code' | 'creative' | 'business' | 'analysis';
  icon?: React.ReactNode;
  starred?: boolean;
  priority?: 'high' | 'medium' | 'low';
}

interface AICapability {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  examples: string[];
}

const aiCapabilities: AICapability[] = [
  {
    id: 'code',
    title: 'Code Architecture',
    description: 'Full-stack development, debugging, and optimization',
    icon: <Code className="w-5 h-5" />,
    gradient: 'from-violet-500 to-purple-600',
    examples: ['React/TypeScript setup', 'API design', 'Performance optimization', 'Code review']
  },
  {
    id: 'creative',
    title: 'Creative Intelligence',
    description: 'Content creation, storytelling, and ideation',
    icon: <Lightbulb className="w-5 h-5" />,
    gradient: 'from-pink-500 to-rose-600',
    examples: ['Story development', 'Marketing copy', 'Brand strategy', 'Content planning']
  },
  {
    id: 'analysis',
    title: 'Data Analysis',
    description: 'Research, insights, and strategic recommendations',
    icon: <TrendingUp className="w-5 h-5" />,
    gradient: 'from-emerald-500 to-green-600',
    examples: ['Market research', 'Data visualization', 'Trend analysis', 'Business strategy']
  },
  {
    id: 'productivity',
    title: 'Productivity Hub',
    description: 'Task management, planning, and optimization',
    icon: <Target className="w-5 h-5" />,
    gradient: 'from-blue-500 to-cyan-600',
    examples: ['Project planning', 'Workflow optimization', 'Time management', 'Goal setting']
  }
];

const exampleConversations: Conversation[] = [
  {
    id: '1',
    title: '🚀 Next.js 14 Production Setup',
    category: 'code',
    icon: <Code className="w-4 h-4" />,
    starred: true,
    priority: 'high',
    messages: [
      {
        id: '1',
        text: "I need to set up a production-ready Next.js 14 app with TypeScript, Tailwind, and proper CI/CD. What's the complete architecture?",
        isUser: true,
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
      },
      {
        id: '2',
        text: `Excellent! I'll guide you through a bulletproof Next.js 14 production setup. Here's the complete architecture:

**🏗️ Project Foundation:**

\`\`\`bash
npx create-next-app@latest my-app --typescript --tailwind --eslint
cd my-app
npm install @next/bundle-analyzer prisma @prisma/client
npm install -D @types/node tsx
\`\`\`

**📁 Recommended Structure:**

\`\`\`
src/
├── app/                 # App Router (Next.js 14)
│   ├── (dashboard)/     # Route groups
│   ├── api/            # API routes
│   └── globals.css     # Global styles
├── components/         # Reusable components
│   ├── ui/            # Base components
│   └── feature/       # Feature components
├── lib/               # Utilities
├── hooks/             # Custom hooks
└── types/             # TypeScript definitions
\`\`\`

**⚡ Performance Optimizations:**

\`\`\`typescript
// next.config.js
const nextConfig = {
  experimental: {
    ppr: true,              // Partial Prerendering
    reactCompiler: true,    // React Compiler
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ];
  },
};
\`\`\`

This setup gives you enterprise-grade performance, security, and scalability! 🎯`,
        isUser: false,
        timestamp: new Date(Date.now() - 1000 * 60 * 14),
        type: 'code',
      },
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 20),
  },
  {
    id: '2',
    title: '📈 SaaS Growth Strategy Analysis',
    category: 'analysis',
    icon: <TrendingUp className="w-4 h-4" />,
    starred: false,
    priority: 'medium',
    messages: [
      {
        id: '5',
        text: "Analyze the current SaaS market trends and help me develop a go-to-market strategy for an AI-powered design tool.",
        isUser: true,
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
      },
      {
        id: '6',
        text: `Excellent timing! The AI design tool market is experiencing explosive growth. Here's my comprehensive analysis:

**📊 Market Landscape (2024):**

• **Market Size:** $4.2B → $12.8B (projected 2027)
• **Growth Rate:** 35% CAGR in AI design tools
• **Key Players:** Figma, Canva, Adobe, Midjourney
• **Gap Identified:** Professional-grade AI tools for design teams

**🎯 Go-to-Market Strategy:**

**Phase 1: Foundation (Months 1-3)**
• Target: Design teams at Series A-C startups
• Price: $29/user/month (team plans)
• Channels: Product Hunt, design communities, LinkedIn
• Goal: 100 paid teams, $30K MRR

**Phase 2: Expansion (Months 4-8)**
• Target: Enterprise design systems teams
• Price: Custom enterprise pricing ($50K+ deals)
• Channels: Outbound sales, partnerships, conferences
• Goal: 500 teams, $150K MRR

**💡 Competitive Advantages:**
• AI-native design workflows
• Real-time collaboration
• Design system automation
• Brand consistency enforcement

**🚀 Key Metrics to Track:**
• User activation rate (7-day)
• Feature adoption (AI tools)
• Net Revenue Retention
• Time-to-value for new users

The market timing is perfect - design teams are actively seeking AI integration! 🎨`,
        isUser: false,
        timestamp: new Date(Date.now() - 1000 * 60 * 28),
        type: 'analysis',
      },
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 35),
  },
  {
    id: '3',
    title: '✨ Interactive Story: The Quantum Café',
    category: 'creative',
    icon: <Lightbulb className="w-4 h-4" />,
    starred: true,
    priority: 'low',
    messages: [
      {
        id: '9',
        text: "Create an interactive sci-fi story where I make choices that affect the outcome. Start with a mysterious café that exists between dimensions.",
        isUser: true,
        timestamp: new Date(Date.now() - 1000 * 60 * 45),
      },
      {
        id: '10',
        text: `🌌 **THE QUANTUM CAFÉ** 🌌

*You push through the heavy glass door, and immediately know something is wrong. The café shouldn't exist here—between the bank and the bookstore was an empty lot yesterday. But here it is, humming with an otherworldly energy.*

**📍 SCENE:** A dimly lit café with impossible geometry. Tables float at different gravitational orientations. Customers from various time periods sit reading newspapers from futures that may never come.

**☕ THE BARISTA** approaches—ageless, with eyes that reflect stars:
*"Welcome, Traveler. You've found us at an interesting convergence. The Quantum Café serves more than coffee—we serve possibilities. But every choice has consequences across the multiverse."*

**🎭 CRITICAL CHOICE #1:**

**A)** 🔮 Order the "Temporal Espresso" - *See glimpses of your potential futures*
**B)** 📚 Approach the customer reading tomorrow's newspaper - *Learn about coming events*
**C)** 🚪 Notice the back door marked "Staff Only" - *Investigate the café's secrets*
**D)** ⚡ Ask the barista about the dimensional anomaly - *Understand the café's nature*

*The air shimmers with quantum uncertainty. What do you choose?*

**Current Paradox Level:** ◆◇◇◇◇ (Stable)
**Dimensional Coherence:** 87%

*Your choice will ripple through infinite realities...* ✨`,
        isUser: false,
        timestamp: new Date(Date.now() - 1000 * 60 * 43),
        type: 'thinking',
      },
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 50),
  },
];

function App() {
  const [conversations, setConversations] = useState<Conversation[]>(exampleConversations);
  const [activeConversationId, setActiveConversationId] = useState('1');
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCapabilities, setShowCapabilities] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConversation = conversations.find(c => c.id === activeConversationId);
  const filteredConversations = filterCategory === 'all' 
    ? conversations 
    : conversations.filter(c => c.category === filterCategory);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation?.messages]);

  const createNewConversation = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: 'New Conversation',
      messages: [],
      createdAt: new Date(),
      category: 'general',
      icon: <MessageCircle className="w-4 h-4" />,
      starred: false,
      priority: 'medium',
    };
    setConversations(prev => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
    setShowCapabilities(false);
  };

  const deleteConversation = (id: string) => {
    if (conversations.length === 1) return;
    setConversations(prev => prev.filter(c => c.id !== id));
    if (activeConversationId === id) {
      setActiveConversationId(conversations.find(c => c.id !== id)?.id || '');
    }
  };

  const toggleStar = (id: string) => {
    setConversations(prev => prev.map(conv => 
      conv.id === id ? { ...conv, starred: !conv.starred } : conv
    ));
  };

  const getSmartResponse = async (userMessage: string): Promise<{ text: string; type: 'text' | 'code' | 'thinking' | 'analysis' }> => {
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
    
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('code') || lowerMessage.includes('programming') || lowerMessage.includes('javascript') || lowerMessage.includes('react') || lowerMessage.includes('next')) {
      return {
        text: `Here's a professional solution with best practices:

\`\`\`typescript
// Modern implementation with TypeScript
interface UserProfile {
  id: string;
  name: string;
  email: string;
  preferences: UserPreferences;
}

interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  language: string;
}

class UserService {
  private static instance: UserService;
  private cache = new Map<string, UserProfile>();

  static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  async getUserProfile(id: string): Promise<UserProfile | null> {
    // Check cache first
    if (this.cache.has(id)) {
      return this.cache.get(id)!;
    }

    try {
      const response = await fetch(\`/api/users/\${id}\`);
      if (!response.ok) throw new Error('User not found');
      
      const user = await response.json();
      this.cache.set(id, user);
      return user;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      return null;
    }
  }
}
\`\`\`

**🏗️ Architecture Benefits:**
• Singleton pattern for service management
• Built-in caching for performance
• Proper error handling
• TypeScript for type safety
• RESTful API integration

Would you like me to explain any specific pattern or add more functionality?`,
        type: 'code',
      };
    }
    
    if (lowerMessage.includes('business') || lowerMessage.includes('strategy') || lowerMessage.includes('market') || lowerMessage.includes('analysis')) {
      return {
        text: `📊 **Strategic Analysis Framework**

Based on current market dynamics, here's my recommendation:

**🎯 Key Opportunity Areas:**

1. **Market Timing** - Current conditions favor early adoption
2. **Competitive Landscape** - Low saturation in your target segment  
3. **Technology Readiness** - Infrastructure supports rapid scaling
4. **Capital Efficiency** - High ROI potential with proper execution

**📈 Recommended Action Plan:**

**Week 1-2:** Market validation & customer interviews
**Week 3-4:** MVP development & early user testing
**Week 5-8:** Iterate based on feedback, prepare launch
**Week 9-12:** Execute go-to-market strategy

**🔍 Success Metrics:**
• Customer Acquisition Cost (CAC) < $50
• Lifetime Value (LTV) > $500
• Product-Market Fit Score > 40%
• Monthly Growth Rate > 20%

**⚠️ Risk Mitigation:**
• Diversify customer segments
• Build strong retention mechanisms
• Maintain 6+ months runway
• Establish strategic partnerships

The data suggests this is an excellent time to execute! 🚀`,
        type: 'analysis',
      };
    }
    
    if (lowerMessage.includes('creative') || lowerMessage.includes('story') || lowerMessage.includes('write') || lowerMessage.includes('idea') || lowerMessage.includes('choice')) {
      return {
        text: `✨ **Creative Exploration Activated**

🎭 **Narrative Development Process:**

Let me dive deep into this creative challenge using my **"Infinite Possibility Engine"**:

🌟 **Core Creative Principles:**
• **Emotional Resonance** - What feeling should this evoke?
• **Unexpected Connections** - How can we surprise the audience?
• **Authentic Voice** - What makes this uniquely yours?
• **Universal Themes** - How does this connect to human experience?

**🎨 Ideation Techniques:**

1. **The "What If" Cascade:**
   - What if the impossible was mundane?
   - What if time worked differently?
   - What if emotions had physical form?

2. **Character Contradiction Method:**
   - A fearless person afraid of butterflies
   - A time traveler who's always late
   - A mind reader who can't understand themselves

3. **Setting Fusion:**
   - Ancient Rome + Virtual Reality
   - Space station + 1920s speakeasy
   - Underwater city + Wild West

**🎯 Next Steps:**
Which creative direction calls to you? I can help develop any concept into a full narrative with rich characters, compelling conflicts, and satisfying resolutions!

Let's create something extraordinary together! 🚀`,
        type: 'thinking',
      };
    }
    
    const responses = [
      "Fascinating question! Let me analyze this from multiple angles and provide you with actionable insights...",
      "This touches on something really important. I'll break down the key factors and give you a strategic perspective...",
      "Great timing on this question! Based on current trends and data, here's what I recommend...",
      "I love diving into topics like this! Let me share some advanced insights that could be game-changing...",
      "This is exactly the kind of strategic thinking that drives success. Here's my comprehensive analysis...",
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    const elaboration = userMessage.includes('?') 
      ? " I've structured this to give you immediately actionable next steps. What specific aspect would you like to explore deeper?"
      : " This framework should provide a solid foundation for moving forward. Which component would you like to dive into first?";
    
    return {
      text: `${randomResponse}

**🎯 Key Insights:**
• Strategic approach will yield better long-term results
• Consider multiple implementation pathways
• Risk mitigation should be built into the plan
• Success metrics need to be clearly defined

${elaboration}`,
      type: 'text',
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !activeConversation) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setConversations(prev =>
      prev.map(conv =>
        conv.id === activeConversationId
          ? {
              ...conv,
              messages: [...conv.messages, userMessage],
              title: conv.messages.length === 0 ? inputMessage.trim().slice(0, 40) + '...' : conv.title,
            }
          : conv
      )
    );

    setInputMessage('');
    setIsTyping(true);

    try {
      const { text, type } = await getSmartResponse(userMessage.text);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text,
        isUser: false,
        timestamp: new Date(),
        type,
      };

      setConversations(prev =>
        prev.map(conv =>
          conv.id === activeConversationId
            ? { ...conv, messages: [...conv.messages, aiMessage] }
            : conv
        )
      );
    } catch (error) {
      console.error('Error generating AI response:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessage = (text: string, type?: string) => {
    if (type === 'code' && text.includes('```')) {
      const parts = text.split('```');
      return parts.map((part, index) => {
        if (index % 2 === 1) {
          const [language, ...codeLines] = part.split('\n');
          const code = codeLines.join('\n').trim();
          return (
            <div key={index} className="my-4 neomorphic-code-block bg-gradient-to-br from-gray-900 to-slate-800 rounded-2xl p-6 overflow-x-auto">
              {language && (
                <div className="text-xs text-blue-400 mb-3 font-medium uppercase tracking-wider">{language}</div>
              )}
              <pre className="text-sm text-green-400 font-mono leading-relaxed">
                <code>{code}</code>
              </pre>
            </div>
          );
        }
        return <span key={index} className="whitespace-pre-wrap">{part}</span>;
      });
    }
    
    return <span className="whitespace-pre-wrap">{text}</span>;
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'code': return 'bg-violet-50 border-violet-200 text-violet-700';
      case 'creative': return 'bg-pink-50 border-pink-200 text-pink-700';
      case 'business': return 'bg-emerald-50 border-emerald-200 text-emerald-700';
      case 'analysis': return 'bg-orange-50 border-orange-200 text-orange-700';
      default: return 'bg-blue-50 border-blue-200 text-blue-700';
    }
  };

  const getPriorityIcon = (priority?: string) => {
    switch (priority) {
      case 'high': return <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />;
      case 'medium': return <div className="w-2 h-2 rounded-full bg-yellow-500" />;
      case 'low': return <div className="w-2 h-2 rounded-full bg-green-500" />;
      default: return null;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Enhanced Sidebar */}
      <div className="w-96 bg-gradient-to-b from-white/90 to-gray-50/80 backdrop-blur-md border-r border-gray-200/50 flex flex-col neomorphic-container">
        {/* Brand Header */}
        <div className="p-6 border-b border-gray-200/50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 rounded-xl flex items-center justify-center neomorphic-logo animate-float">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">NeuroChat AI</h2>
                <p className="text-xs text-gray-500 font-medium">Advanced Intelligence Assistant</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="neomorphic-icon-button"
              onClick={() => setShowCapabilities(!showCapabilities)}
            >
              <Settings className="w-4 h-4 text-gray-600" />
            </Button>
          </div>
          
          <Button 
            onClick={createNewConversation}
            className="w-full neomorphic-button bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-700 hover:from-blue-600 hover:via-purple-700 hover:to-indigo-800 text-white border-0 py-3 font-semibold"
            size="lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Conversation
          </Button>
        </div>

        {/* Capabilities Panel */}
        {showCapabilities && (
          <div className="p-4 border-b border-gray-200/50 animate-slide-up">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <Zap className="w-4 h-4 mr-2 text-blue-500" />
              AI Capabilities
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {aiCapabilities.map((capability) => (
                <div
                  key={capability.id}
                  className={`p-3 rounded-lg neomorphic-item cursor-pointer group bg-gradient-to-br ${capability.gradient} text-white`}
                  onClick={() => {
                    setInputMessage(`Help me with ${capability.title.toLowerCase()}: `);
                    setShowCapabilities(false);
                  }}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    {capability.icon}
                    <span className="text-xs font-semibold">{capability.title}</span>
                  </div>
                  <p className="text-xs opacity-90">{capability.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filter and Stats */}
        <div className="p-4 border-b border-gray-200/50">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700 flex items-center">
              <Activity className="w-4 h-4 mr-2 text-emerald-500" />
              Conversations
            </h3>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">{conversations.length} total</span>
              <Button
                variant="ghost"
                size="sm"
                className="neomorphic-icon-button p-1"
                onClick={() => setFilterCategory(filterCategory === 'all' ? 'code' : 'all')}
              >
                <Filter className="w-3 h-3" />
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap gap-1">
            {['all', 'code', 'creative', 'business', 'analysis'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1 text-xs rounded-full transition-all ${
                  filterCategory === cat
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`group p-4 rounded-xl cursor-pointer transition-all duration-300 neomorphic-item ${
                activeConversationId === conversation.id
                  ? `neomorphic-active ${getCategoryColor(conversation.category)}`
                  : 'neomorphic-inactive hover:bg-white/80'
              }`}
              onClick={() => setActiveConversationId(conversation.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3 flex-1 min-w-0">
                  <div className="flex-shrink-0 mt-0.5">
                    {conversation.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-semibold text-gray-800 truncate leading-tight">
                        {conversation.title}
                      </span>
                      {conversation.starred && (
                        <Star className="w-3 h-3 text-yellow-500 fill-current flex-shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {getPriorityIcon(conversation.priority)}
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(conversation.category)}`}>
                        {conversation.category}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="neomorphic-icon-button p-1 h-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStar(conversation.id);
                    }}
                  >
                    <Star className={`w-3 h-3 ${conversation.starred ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                  </Button>
                  {conversations.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="neomorphic-icon-button p-1 h-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteConversation(conversation.id);
                      }}
                    >
                      <Trash2 className="w-3 h-3 text-gray-500" />
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center space-x-1">
                    <MessageCircle className="w-3 h-3" />
                    <span>{conversation.messages.length}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{conversation.createdAt.toLocaleDateString()}</span>
                  </span>
                </div>
              </div>
              
              {conversation.messages.length > 0 && (
                <div className="text-xs text-gray-600 truncate leading-relaxed">
                  {conversation.messages[conversation.messages.length - 1].text.slice(0, 80)}...
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Enhanced Chat Header */}
        <div className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 p-6 neomorphic-header">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  {activeConversation?.icon}
                  <h1 className="text-2xl font-bold text-gray-800">
                    {activeConversation?.title || 'New Conversation'}
                  </h1>
                </div>
                {activeConversation?.category && (
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(activeConversation.category)}`}>
                      {activeConversation.category}
                    </span>
                    {activeConversation.starred && (
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    )}
                    {getPriorityIcon(activeConversation.priority)}
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-2 flex items-center space-x-4">
                <span className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="font-medium">AI Assistant Online</span>
                </span>
                <span>{activeConversation?.messages.length || 0} messages</span>
                <span className="flex items-center space-x-1">
                  <Users className="w-3 h-3" />
                  <span>1 active user</span>
                </span>
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="neomorphic-icon-button">
                <Bookmark className="w-4 h-4 text-gray-600" />
              </Button>
              <Button variant="ghost" size="sm" className="neomorphic-icon-button">
                <MoreHorizontal className="w-5 h-5 text-gray-600" />
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-gradient-to-b from-transparent via-white/20 to-blue-50/30">
          {activeConversation?.messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-slide-up`}
            >
              <div className={`flex items-start space-x-4 ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''} max-w-4xl`}>
                {/* Enhanced Avatar */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${
                  message.isUser 
                    ? 'bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 neomorphic-avatar' 
                    : 'bg-gradient-to-br from-emerald-400 via-cyan-500 to-teal-600 neomorphic-avatar'
                }`}>
                  {message.isUser ? (
                    <User className="w-5 h-5 text-white" />
                  ) : (
                    <Brain className="w-5 h-5 text-white" />
                  )}
                </div>

                {/* Enhanced Message Bubble */}
                <div
                  className={`max-w-2xl px-6 py-5 rounded-2xl shadow-lg ${
                    message.isUser
                      ? 'neomorphic-user-message bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 text-white'
                      : `neomorphic-ai-message bg-white/95 backdrop-blur-sm text-gray-800 ${
                          message.type === 'code' ? 'border-l-4 border-violet-500' :
                          message.type === 'thinking' ? 'border-l-4 border-pink-500' :
                          message.type === 'analysis' ? 'border-l-4 border-emerald-500' :
                          'border-l-4 border-blue-500'
                        }`
                  }`}
                >
                  {/* Enhanced Message type indicator */}
                  {!message.isUser && message.type && (
                    <div className="flex items-center space-x-2 mb-3 pb-3 border-b border-gray-200">
                      {message.type === 'code' && <Code className="w-4 h-4 text-violet-600" />}
                      {message.type === 'thinking' && <Lightbulb className="w-4 h-4 text-pink-600" />}
                      {message.type === 'analysis' && <TrendingUp className="w-4 h-4 text-emerald-600" />}
                      <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">{message.type}</span>
                      <div className="flex-1" />
                      <span className="text-xs text-gray-500">Processing...</span>
                    </div>
                  )}
                  
                  <div className="text-sm leading-relaxed">
                    {formatMessage(message.text, message.type)}
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200/50">
                    <p className={`text-xs ${message.isUser ? 'text-blue-100' : 'text-gray-500'} flex items-center space-x-2`}>
                      <Clock className="w-3 h-3" />
                      <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </p>
                    {!message.isUser && (
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="text-xs text-gray-500 hover:text-gray-700 p-1">
                          <Bookmark className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-xs text-gray-500 hover:text-gray-700 p-1">
                          <ChevronRight className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start animate-slide-up">
              <div className="flex items-start space-x-4 max-w-4xl">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 via-cyan-500 to-teal-600 neomorphic-avatar flex items-center justify-center shadow-lg">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div className="neomorphic-ai-message bg-white/95 backdrop-blur-sm text-gray-800 px-6 py-5 rounded-2xl shadow-lg border-l-4 border-blue-500">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-xs text-gray-500 font-medium">AI is thinking...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Enhanced Input Area */}
        <div className="bg-white/90 backdrop-blur-md border-t border-gray-200/50 p-6 neomorphic-input-area">
          <div className="flex items-end space-x-4 max-w-6xl mx-auto">
            <div className="flex-1 neomorphic-input-container relative">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask anything... I'm your advanced AI assistant! ✨"
                className="border-0 bg-transparent neomorphic-input focus:ring-2 focus:ring-blue-300 resize-none text-sm py-5 px-6 pr-16 font-medium"
                disabled={isTyping}
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                {inputMessage.length > 0 && (
                  <span className="text-xs text-gray-400 font-medium">
                    {inputMessage.length}/2000
                  </span>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="neomorphic-icon-button p-1"
                  onClick={() => setShowCapabilities(!showCapabilities)}
                >
                  <Brain className="w-4 h-4 text-gray-500" />
                </Button>
              </div>
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="neomorphic-send-button bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-700 hover:from-blue-600 hover:via-purple-700 hover:to-indigo-800 text-white px-8 py-5 rounded-xl font-semibold shadow-lg"
              size="lg"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="text-center mt-4">
            <p className="text-xs text-gray-500 flex items-center justify-center space-x-4">
              <span className="flex items-center space-x-1">
                <kbd className="px-2 py-1 bg-gray-100 rounded text-xs font-semibold">Enter</kbd>
                <span>to send</span>
              </span>
              <span className="flex items-center space-x-1">
                <kbd className="px-2 py-1 bg-gray-100 rounded text-xs font-semibold">Shift + Enter</kbd>
                <span>for new line</span>
              </span>
              <span className="flex items-center space-x-1">
                <Shield className="w-3 h-3 text-green-500" />
                <span className="font-medium">Encrypted & Secure</span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;