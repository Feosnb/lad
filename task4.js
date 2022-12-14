const mage = {
    maxHealth: 10,
    name: "Евстафий",
    moves: [
    {
        "name": "Удар боевым кадилом",
        "physicalDmg": 2,
        "magicDmg": 0,
        "physicArmorPercents": 0,
        "magicArmorPercents": 50,
        "cooldown": 0
    },
    {
        "name": "Вертушка левой пяткой",
        "physicalDmg": 4,
        "magicDmg": 0,
        "physicArmorPercents": 0,
        "magicArmorPercents": 0,
        "cooldown": 4
    },
    {
        "name": "Каноничный фаербол",
        "physicalDmg": 0,
        "magicDmg": 5,
        "physicArmorPercents": 0,
        "magicArmorPercents": 0,
        "cooldown": 3
    },
    {
        "name": "Магический блок",
        "physicalDmg": 0,
        "magicDmg": 0,
        "physicArmorPercents": 100,
        "magicArmorPercents": 100,
        "cooldown": 4
    },
]
}
const monster = {
    maxHealth: 10,
    name: "Лютый",
    moves: [
        {
            "name": "Удар когтистой лапой",
            "physicalDmg": 3, 
            "magicDmg": 0,    
            "physicArmorPercents": 20, 
            "magicArmorPercents": 20,  
            "cooldown": 0     
        },
        {
            "name": "Огненное дыхание",
            "physicalDmg": 0,
            "magicDmg": 4,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 3
        },
        {
            "name": "Удар хвостом",
            "physicalDmg": 2,
            "magicDmg": 0,
            "physicArmorPercents": 50,
            "magicArmorPercents": 0,
            "cooldown": 2
        },
    ]
}

mage.maxHealth = prompt ('Определите уровень сложности (начальное количество HP Евстахия)')
let mageHP = mage.maxHealth
let monsterHP = monster.maxHealth
let cooldowns = {
    "Удар боевым кадилом": 0,
    "Вертушка левой пяткой": 0,
    "Огненное дыхание": 0,
    "Удар когтистой лапой": 0,
    "Удар хвостом": 0,
    "Магический блок": 0,
    "Каноничный фаербол": 0,
}

function onCooldown (monsterSkill, mageSkill) {
    let monsterSkillName=monster.moves[monsterSkill].name
    let mageSkillName=mage.moves[mageSkill].name
    cooldowns[monsterSkillName]=monster.moves[monsterSkill].cooldown
    cooldowns[mageSkillName]=mage.moves[mageSkill].cooldown
    for (const key in cooldowns) {
        if (cooldowns[key]>0) {
           cooldowns[key] -= 1          
        }
    }

}

function action (monsterAct, mageAct) {
    let monsterMove = monster.moves[monsterAct]
    let mageMove = mage.moves[mageAct]
    let monsterReducer = monsterMove.physicArmorPercents / 100
    let mageReducer = mageMove.physicArmorPercents / 100
    let monsterReducedAttack = (monsterMove.physicalDmg - monsterMove.physicalDmg * mageReducer) + (monsterMove.magicDmg - monsterMove.magicDmg * mageReducer)
    let mageReducedAttack = (mageMove.physicalDmg - mageMove.physicalDmg * monsterReducer) + (mageMove.magicDmg - mageMove.magicDmg * monsterReducer)
    mageHP -= monsterReducedAttack
    monsterHP -= mageReducedAttack
    if (mageHP<=0) {
        return alert(`Лютый победил :'(`)  
    } 
    if (monsterHP<=0){
        return alert(`Евстафий победил ^_^`)
   }
} 

function fight() {
 for (i = 0; mageHP > 0 &&  monsterHP > 0; i++ ) { 
    let monsterMove = Math.round(Math.random()* 2)
    let mageMove = Number(prompt(`Лютый собирается применить способность ${monster.moves[monsterMove].name} , выберите способность который вы ему ответите: 
    0-Удар боевым кадилом (кулдаун 0)
    1-Вертушка левой пяткой (кулдаун ${cooldowns['Вертушка левой пяткой']})
    2-Каноничный фаербол (кулдаун ${cooldowns['Каноничный фаербол']}) 
    3-Магический блок (кулдаун ${cooldowns['Магический блок']}) 
    Монстр применяет способность первым`)) 
    if (mageMove> 3) {
        alert (`Неверно введен номер способности, пожалуйста выберете от 0 до 3`)
        continue
    } 
    else if (cooldowns[mage.moves[mageMove].name]>0) {
        alert (`Способность в кулдауне, выберите другую`)
        continue
    }
    onCooldown (monsterMove,mageMove)
    action(monsterMove,mageMove)
    alert(`Ваше здоровье: ${mageHP}
Здоровье Лютого: ${monsterHP}
Конец хода номер ${i+1}`)
 }
}

fight()
