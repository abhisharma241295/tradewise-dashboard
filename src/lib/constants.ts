export const TRADEWISE_USER_TOKEN = "TRADEWISE_USER_TOKEN"
export const TRADEWISE_USER_DATA = "TRADEWISE_USER_DATA"
export const TRADEWISE_EMAIL_RESET_PASSWORD = "TRADEWISE_EMAIL_RESET_PASSWORD"

export const steps = [
    { label: "Personal", stepId: 1 },
    { label: "Position", stepId: 2 },
    { label: "Password", stepId: 3 },
];

export const daysFilterMenu = [
    { label: "Last 7 days", value: "7", key: 1 },
    { label: "Last 14 days", value: "14", key: 2 },
    { label: "1 Month", value: "30", key: 3 },
    { label: "2 Months", value: "60", key: 4 },
    { label: "3 Months", value: "90", key: 5 },
]

export const priorityStatus = ["LOW", "MEDIUM", "HIGH", "CRITICAL"]

export const hsCodes = ["34LA71", "4N9368", "792JU8", "P01494", "74NM91", "23A591"];

export const regulatorySources = ["ALL", "USTR", "CBP", "FEDERAL"];

export const filtersOptions = [
    // { key: "HSCode", label: "HSCode", icon: 'code' },
    { key: "countryOrigin", label: "Country of Origin", icon: 'globe' },
    { key: "Status", label: "Status", icon: 'gitpull' },
    { key: "regulatory", label: "Regulatory Sources", icon: 'bookopen' },
];


// export const pricingPlans: PricePlan[] = [
//     {
//         title: "Trial",
//         price: 9,
//         popular: false,
//         features: ['500 CRM contacts',
//             '1 community integration',
//             'Unlimited events',
//             '1 seat'],
//         product_id: "prod_RAAuL4A3YipsFh",
//         price_id: "price_1QHqYjSG96Tqqs6HfCBdHL8r",
//     },
//     {
//         title: "Basic",
//         price: 29,
//         popular: false,
//         features: [
//             "Website Copywriting",
//             "Website Analysis",
//             "1 Knowledge Base",
//             "1 Brand Voice",
//             "Website Layout",
//             "700 Credits",
//         ],
//         product_id: "prod_R9Ip8jPB0mVPZh",
//         price_id: "price_1QH0EKSG96Tqqs6HXz6NMs3G",
//     },
//     {
//         title: "Premium",
//         price: 49,
//         popular: true,
//         features: [
//             "Website Copywriting",
//             "Website Analysis",
//             "3 Knowledge Base",
//             "3 Brand Voice",
//             "Website Layout",
//             "Performance Tracking",
//             "A/B Testing",
//             "1200 Credits",
//         ],
//         product_id: "prod_R9Iq0EZVuX4ldP",
//         price_id: "price_1QH0EdSG96Tqqs6HSWL2sOjN",
//     },
//     {
//         title: "Business",
//         price: 69,
//         popular: false,
//         features: [
//             "Website Copywriting",
//             "Website Analysis",
//             "Unlimited Knowledge Base",
//             "Unlimited Brand Voice",
//             "Website Layout",
//             "Performance Tracking",
//             "A/B Testing",
//             "SEO Keyword Enabled",
//             "2000 Credits",
//         ],
//         product_id: "prod_R9Iqd5U0os05kn",
//         price_id: "price_1QH0EySG96Tqqs6HU67DLWJu",
//     },
// ]
export const pricingPlans = [
    {
        id: 1,
        plan: 'Essential',
        monthlyPrice: 149,
        yearlyPrice: 1349,
        description: 'For starting-out communities and hobbyist community builders.',
        features: [
            'Real time trade policy monitor',
            'Compliance risk alerts',
            'Track up to 5 HS Codes',
            'All Countries of Origin covered',
            'Instant email notifications',
            'No long-term commitment; cancel anytime'
        ],
        popular: true,
    },
    {
        id: 2,
        plan: 'Premium',
        monthlyPrice: 299,
        yearlyPrice: 2699,
        description: 'For small teams looking for a united view of their community andengagement tracking.',
        features: [
            'Everything in Essential, plus:',
            'Unlimited HS code monitoring',
            'Interactive compliance checklists',
            'Custom document generator',
            'Advanced trade analytics dashboard',
            'Customizable alert preferences',
            'No long-term commitment; cancel anytime'
        ],
        popular: false,
    },

]