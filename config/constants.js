export const LOCALE_SHORTHANDS = {
    english: "en-US",
    hindi: "hi",
    telugu: "te",
    kannada: "en-US",
    gujarati: "gu",
    marathi: "en-US",
    tamil: "ta",
    bengali: "bn",
    punjabi: "en-US",
    malayalam: "en-US",
    odiya: "en-US",
};

export const STATISTIC_DEFINITIONS = {
    users: {
        displayName: "Users",
        color: "cherryMid",
        dotColor: "cherry",
        format: "int",
        options: { key: "users" },
    },
    active: {
        displayName: "Active",
        color: "blueMid",
        dotColor: "blue",
        format: "int",
        options: { key: "active" },
        hideDelta: true,
    },
    sessions: {
        displayName: "Sessions",
        color: "greenMid",
        dotColor: "green",
        format: "int",
        options: { key: "sessions" },
    },
    bounce: {
        displayName: "Bounce",
        color: "grayMid",
        dotColor: "gray",
        format: "%",
        options: { key: "bounce" },
    },
};

const definitions = Object.keys(STATISTIC_DEFINITIONS).reduce(
    (acc, statistic) => {
        const { options, ...config } = STATISTIC_DEFINITIONS[statistic];
        acc.options[statistic] = options;
        acc.configs[statistic] = config;
        return acc;
    },
    { options: {}, configs: {} }
);

export const STATISTIC_CONFIGS = definitions.configs;
export const STATISTIC_OPTIONS = definitions.options;

export const PER_MILLION_OPTIONS = {
    normalizeByKey: "population",
    multiplyFactor: 1e6,
};

export const NAN_STATISTICS = ["tested", "vaccinated", "tpr", "population"];

export const PRIMARY_STATISTICS = ["users", "active", "sessions", "bounce"];

export const BRUSH_STATISTICS = ["other", "deceased", "recovered", "active"];

export const TABLE_STATISTICS = [...PRIMARY_STATISTICS, "tested", "vaccinated"];

export const TABLE_STATISTICS_EXPANDED = Object.keys(STATISTIC_DEFINITIONS);

export const TIMESERIES_STATISTICS = [...PRIMARY_STATISTICS];

export const UPDATES_COUNT = 5;

export const DISTRICT_TABLE_COUNT = 40;

export const D3_TRANSITION_DURATION = 300;

export const MINIGRAPH_LOOKBACK_DAYS = 20;

export const TESTED_LOOKBACK_DAYS = 7;

export const UNASSIGNED_STATE_CODE = "UN";

export const UNKNOWN_DISTRICT_KEY = "Unknown";

export const ISO_DATE_REGEX = /^\d{4}-([0]\d|1[0-2])-([0-2]\d|3[01])$/g;

export const INDIA_ISO_SUFFIX = "T00:00:00+05:30";

export const SPRING_CONFIG_NUMBERS = { clamp: true, precision: 1 };

export const TIMESERIES_CHART_TYPES = {
    total: "Cumulative",
    delta: "Daily",
};

export const pages = [
    {
        pageLink: "/",
        displayName: "Home",
        showInNavbar: true,
        exact: true,
    },
    {
        pageLink: "/projects",
        displayName: "Projects",
        showInNavbar: true,
        exact: false,
    },
    {
        pageLink: "/projects/:projectId",
        displayName: "Projects Details",
        showInNavbar: false,
        exact: false,
    },
    {
        pageLink: "/docs",
        displayName: "Docs",
        showInNavbar: true,
        exact: true,
    },
    {
        pageLink: "/about",
        displayName: "About",
        showInNavbar: true,
        exact: true,
    },
    {
        pageLink: "/state/:stateCode",
        displayName: "State",
        showInNavbar: false,
        exact: true,
    },
];

export const footerData = [
    {
        label: "Help & Support",
        key: "helpSupport",
        categories: [
            {
                label: "Demo",
                key: "demo",
                href: "/share/1354cb95-33a4-4d3d-8dfc-eb2715d154fc",
            },
            {
                label: "About",
                key: "about",
                href: "/about",
            },
            {
                label: "Docs",
                key: "docs",
                href: "/docs",
            },
            {
                label: "Blog",
                key: "blog",
                href: "#",
            },
            {
                label: "Help",
                key: "help",
                href: "#",
            },
            {
                label: "Getting Started",
                key: "gettingStarted",
                href: "/docs/getting-started",
            },
            {
                label: "FAQs",
                key: "fAQs",
                href: "#",
            },
        ],
    },
    {
        label: "Legal",
        key: "legal",
        categories: [
            {
                label: "Terms & Conditions",
                key: "termsConditions",
                href: "#",
            },
            {
                label: "Privacy Policy",
                key: "privacyPolicy",
                href: "#",
            },
        ],
    },
    {
        label: "Community",
        key: "community",
        categories: [
            {
                label: "Roadmap",
                key: "roadmap",
                href: "https://github.com/subhendukundu/ntrace/projects/1",
            },
        ],
    },
];

export const pricesData = [
    {
        color: "#dc3545",
    },
    {
        color: "#007bff",
    },
    {
        color: "#28a745",
    },
    {
        color: "gray",
    },
];

export const timeZones = [
    {
        key: "Etc/GMT+12",
        name: "(GMT-12:00) International Date Line West",
    },
    {
        key: "Pacific/Midway",
        name: "(GMT-11:00) Midway Island, Samoa",
    },
    {
        key: "Pacific/Honolulu",
        name: "(GMT-10:00) Hawaii",
    },
    {
        key: "US/Alaska",
        name: "(GMT-09:00) Alaska",
    },
    {
        key: "America/Los_Angeles",
        name: "(GMT-08:00) Pacific Time (US & Canada)",
    },
    {
        key: "US/Arizona",
        name: "(GMT-07:00) Arizona",
    },
    {
        key: "America/Managua",
        name: "(GMT-06:00) Central America",
    },
    {
        key: "US/Central",
        name: "(GMT-06:00) Central Time (US & Canada)",
    },
    {
        key: "America/Bogota",
        name: "(GMT-05:00) Bogota, Lima, Quito, Rio Branco",
    },
    {
        key: "US/Eastern",
        name: "(GMT-05:00) Eastern Time (US & Canada)",
    },
    {
        key: "Canada/Atlantic",
        name: "(GMT-04:00) Atlantic Time (Canada)",
    },
    {
        key: "America/Argentina/Buenos_Aires",
        name: "(GMT-03:00) Buenos Aires, Georgetown",
    },
    {
        key: "America/Noronha",
        name: "(GMT-02:00) Mid-Atlantic",
    },
    {
        key: "Atlantic/Azores",
        name: "(GMT-01:00) Azores",
    },
    {
        key: "Etc/Greenwich",
        name: "(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London",
    },
    {
        key: "Europe/Amsterdam",
        name: "(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna",
    },
    {
        key: "Europe/Helsinki",
        name: "(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius",
    },
    {
        key: "Europe/Moscow",
        name: "(GMT+03:00) Moscow, St. Petersburg, Volgograd",
    },
    {
        key: "Asia/Tehran",
        name: "(GMT+03:30) Tehran",
    },
    {
        key: "Asia/Yerevan",
        name: "(GMT+04:00) Yerevan",
    },
    {
        key: "Asia/Kabul",
        name: "(GMT+04:30) Kabul",
    },
    {
        key: "Asia/Yekaterinburg",
        name: "(GMT+05:00) Yekaterinburg",
    },
    {
        key: "Asia/Karachi",
        name: "(GMT+05:00) Islamabad, Karachi, Tashkent",
    },
    {
        key: "Asia/Calcutta",
        name: "(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi",
    },
    {
        key: "Asia/Katmandu",
        name: "(GMT+05:45) Kathmandu",
    },
    {
        key: "Asia/Dhaka",
        name: "(GMT+06:00) Astana, Dhaka",
    },
    {
        key: "Asia/Rangoon",
        name: "(GMT+06:30) Yangon (Rangoon)",
    },
    {
        key: "Asia/Bangkok",
        name: "(GMT+07:00) Bangkok, Hanoi, Jakarta",
    },
    {
        key: "Asia/Hong_Kong",
        name: "(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi",
    },
    {
        key: "Asia/Seoul",
        name: "(GMT+09:00) Seoul",
    },
    {
        key: "Australia/Adelaide",
        name: "(GMT+09:30) Adelaide",
    },
    {
        key: "Australia/Canberra",
        name: "(GMT+10:00) Canberra, Melbourne, Sydney",
    },
    {
        key: "Asia/Magadan",
        name: "(GMT+11:00) Magadan, Solomon Is., New Caledonia",
    },
    {
        key: "Pacific/Auckland",
        name: "(GMT+12:00) Auckland, Wellington",
    },
    {
        key: "Pacific/Tongatapu",
        name: "(GMT+13:00) Nuku'alofa",
    },
];
