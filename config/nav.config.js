import { DOC_URL } from './constants'

export const NAVS = {
  front: [
    {
      title: '',
      items: [
        {
          url: '/workspaces',
          icon: 'IconWorkspace',
          // title: 'WORKSPACE',
          slug: 'workspace',
          titleKey: 'workspace',
          mainMenu: true,
          items: [
            {
              url: '/workspaces',
              icon: '',
              title: 'View All',
              addtionalClass: ' submenu',
              items: []
            }
          ]
        },
        {
          url: '/intents',
          icon: 'IconUserCase',
          // title: 'USE CASES',
          slug: 'intents',
          titleKey: 'use-cases',
          mainMenu: true,
          workspaceMenu: true,
          notForTypes: ['faqs'],
          items: [
            {
              url: '/intents',
              icon: '',
              title: 'View All',
              addtionalClass: ' submenu',
              items: []
            }
          ]
        },
        {
          url: '/entities',
          icon: 'IconEntities',
          slug: 'entities',
          titleKey: 'entities',
          mainMenu: true,
          notForTypes: ['faqs'],
          // title: 'ENTITIES',
          workspaceMenu: true,
          static: true,
          items: []
        },
        {
          url: '/smalltalk',
          icon: 'IconSmallTalk',
          mainMenu: true,
          slug: 'smalltalk',
          // title: 'SMALL TALK',
          notForTypes: ['faqs'],
          titleKey: 'small-talk',
          workspaceMenu: true,
          static: true,
          items: []
        },
        {
          url: '/faqs',
          icon: 'IconFaqs',
          slug: 'faqs',
          mainMenu: true,
          // title: 'FAQS',
          titleKey: 'faqs',
          workspaceMenu: true,
          static: true,
          items: []
        }
      ]
    },
    {
      title: '',
      items: [
        // {
        //   url: '/fulfillment',
        //   icon: 'IconFulfillment',
        //   // title: 'FULLFILLMENT',
        //   titleKey: 'fulfillment',
        //   mainMenu: true,
        //   workspaceMenu: true,
        //   withFlowMenu: true,
        //   items: []
        // },
        // {
        //   url: '/text-templates',
        //   icon: 'IconTextTemplates',
        //   // title: 'TEXT TEMPLATES',
        //   titleKey: 'text-templates',
        //   mainMenu: true,
        //   workspaceMenu: true,
        //   withFlowMenu: true,
        //   items: []
        // },
        {
          url: '/channels',
          icon: 'IconChannels',
          // title: 'CHANNELS',
          titleKey: 'channels',
          mainMenu: true,
          workspaceMenu: true,
          withFlowMenu: true,
          items: []
        },
        {
          url: '/analytics',
          icon: 'IconAnalytics',
          // title: 'ANALYTICS',
          titleKey: 'analytics',
          mainMenu: true,
          workspaceMenu: true,
          items: []
        },
        // {
        //   url: '/support',
        //   icon: 'IconSupport',
        //   // title: 'SUPPORT',
        //   titleKey: 'support',
        //   mainMenu: true,
        //   items: []
        // },
        {
          url: DOC_URL,
          icon: 'IconDocuments',
          // title: 'DOCUMENTS',
          titleKey: 'docs',
          mainMenu: true,
          items: []
        },
        // {
        //   url: '/forum',
        //   icon: 'IconForum',
        //   // title: 'FORUM',
        //   titleKey: 'forum',
        //   mainMenu: true,
        //   items: []
        // }
        {
          action: 'test-workspace',
          icon: 'IconDocuments',
          title: 'TEST WORKSPACE',
          titleKey: 'test-workspace',
          mainMenu: true,
          workspaceMenu: true,
          items: []
        }
      ]
    }
  ],
  admin: [
    {
      title: '',
      items: [
        {
          url: '/users',
          icon: 'IconUser',
          title: 'Users',
          titleKey: 'users',
          mainMenu: true,
          items: []
        },
        {
          url: '/workspace',
          icon: 'IconWorkspace',
          title: 'Workspace',
          titleKey: 'workspace',
          mainMenu: true,
          items: []
        },
        {
          url: '/servers',
          icon: 'IconServer',
          title: 'Servers',
          titleKey: 'servers',
          mainMenu: true,
          items: []
        },
        {
          url: '/trainning',
          icon: 'IconTraining',
          title: 'Training',
          titleKey: 'training',
          mainMenu: true,
          items: []
        },
        {
          url: '/analytics',
          icon: 'IconAnalytics',
          title: 'ANALYTICS',
          titleKey: 'analytics',
          mainMenu: true,
          items: []
        },
        {
          url: '/signin-as',
          icon: 'IconSignInAs',
          title: 'Sign In As',
          titleKey: 'sign-in-as',
          mainMenu: true,
          items: []
        }
      ]
    }
  ],
  doc: [
    {
      title: '',
      items: [
        {
          url: '/overview',
          icon: 'IconWorkspace',
          title: 'Overview',
          titleKey: 'overview',
          mainMenu: true,
          items: []
        },
        {
          url: '/architecture',
          icon: 'IconWorkspace',
          title: 'Architecture',
          titleKey: 'architecture',
          mainMenu: true,
          items: []
        },
        {
          url: '/solutions',
          icon: 'IconWorkspace',
          title: 'Solutions',
          titleKey: 'solutions',
          mainMenu: true,
          items: []
        },
        {
          url: '/demo',
          icon: 'IconWorkspace',
          title: 'Demo',
          titleKey: 'demo',
          mainMenu: true,
          items: []
        },
        {
          url: '/docs',
          icon: 'IconAnalytics',
          title: 'Docs',
          titleKey: 'docs',
          mainMenu: true,
          slug: 'docs',
          static: true,
          items: [
            {
              url: '/docs/howto',
              icon: '',
              title: 'How To',
              items: []
            },
            {
              url: '/docs/api',
              icon: '',
              title: 'Api Reference',
              items: []
            },
            {
              url: '/docs/key',
              icon: '',
              title: 'Key Concepts',
              items: []
            }
          ]
        }
      ]
    }
  ]
}
