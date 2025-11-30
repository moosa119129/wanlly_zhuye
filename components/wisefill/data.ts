import { School } from "./types"

const SCHOOL_NAMES = [
    "七中林荫", "九中宁夏", "石室文庙", "七中高新", "九中光华", "石室北湖", "树德外语", "教科附中", "十二中学", "石室成飞",
    "师大附中", "成都二十中", "成都八中", "成都铁中", "玉林中学", "西北中学", "华西中学", "高新实验", "电子科大附中", "交大附中",
    "成大附中", "七中万达", "树德协进", "石室天府", "七中八一", "科大实验", "成都十八中", "成都三十七中",
    "成都四十九中", "成都三十八中", "成都十七中", "成都十一中", "成都三中", "成都六中", "成都五十中", "成都五十二中", "成都五十六中", "成都六十二中",
    "棠湖中学", "双流中学", "温江中学", "大弯中学", "新都一中", "龙泉中学", "航天中学", "郫都一中", "郫都二中", "简阳中学",
    "阳安中学", "淮口中学", "金堂中学", "彭州中学", "崇州中学", "蜀城中学", "大邑中学", "邛崃一中", "蒲江中学", "新津中学",
    "华阳中学", "籍田中学", "太平中学", "中和中学", "华阳一中", "天府七中", "天府四中", "天府师大一中", "博骏公学", "嘉祥外国语",
    "成外", "实外", "实外西区", "成外高新", "棠外", "双中实验", "温中实验", "新都一中实验", "龙中实验", "北大附中",
    "北师大成都", "盐道街中学", "田家炳中学", "成飞中学", "通锦中学", "武侯高中", "成华高中", "锦江高中", "青羊高中", "金牛高中",
    "高新一中", "天府一中", "东部新区高中", "简阳实验", "彭州一中", "崇州一中", "大邑一中", "邛崃二中", "蒲江一中", "新津一中"
]

export const ALL_SCHOOLS: School[] = SCHOOL_NAMES.map((name, index) => {
    const score = Math.floor(680 - (index * 1.5) + Math.random() * 10)
    const ranking = Math.floor(100 + (index * 150) + Math.random() * 50)

    return {
        id: `school-${index}`,
        name,
        score,
        probability: Math.floor(Math.random() * 100),
        tags: index < 10 ? ["省一级", "双一流"] : index < 30 ? ["省二级", "重点"] : ["公办", "寄宿"],
        type: index < 10 ? 'provincial' : index < 40 ? 'city' : 'common',
        ranking,
        provincialKey: index < 20,
        scoreLine3Years: [
            { year: 2024, score: score, rank: ranking },
            { year: 2023, score: score - Math.floor(Math.random() * 5), rank: ranking + Math.floor(Math.random() * 100) },
            { year: 2022, score: score + Math.floor(Math.random() * 5), rank: ranking - Math.floor(Math.random() * 50) },
        ]
    }
})
