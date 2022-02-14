let genericResource = 5000
let totalMultiplier = 0
let resourcesPerSecond = 0

let userClickUpgrades = {
  userClickUpgradeOne: {
    price: 50,
    quantity: 0,
    multiplier: 2
  },

  userClickUpgradeTwo: {
    price: 100,
    quantity: 0,
    multiplier: 5
  }
}

let automaticUpgrades = {
  autoUpgradeOne: {
    price: 200,
    quantity: 0,
    multiplier: 10
  },

  autoUpgradeTwo: {
    price: 400,
    quantity: 0,
    multiplier: 20
  }
}

function buyClickUpgradeOne() {
  if (genericResource >= userClickUpgrades.userClickUpgradeOne.price) {
    userClickUpgrades.userClickUpgradeOne.quantity += 1
    genericResource -= userClickUpgrades.userClickUpgradeOne.price
    drawResourceTable()
    increaseClickOnePrice()
    combineMultipliers()
  }
}
// [x] when clicking button to purchase upgrade, correct amount of resource is deducted
function buyClickUpgradeTwo() {
  let click = userClickUpgrades.userClickUpgradeTwo
  if (genericResource >= click.price) {
    click.quantity += 1
    genericResource -= click.price
    drawResourceTable()
    increaseClickTwoPrice()
    combineMultipliers()
  }
}

function buyAutoUpgradeOne() {
  let auto = automaticUpgrades.autoUpgradeOne
  if (genericResource >= auto.price) {
    auto.quantity += 1
    genericResource -= auto.price
    drawResourceTable()
    increaseAutoOnePrice()
    combineMultipliers()
    tallyAutoUpsPerSec()
  }
}

function buyAutoUpgradeTwo() {
  let auto = automaticUpgrades.autoUpgradeTwo
  if (genericResource >= auto.price) {
    auto.quantity += 1
    genericResource -= auto.price
    drawResourceTable()
    increaseAutoTwoPrice()
    combineMultipliers()
    tallyAutoUpsPerSec()
  }
}

function applyAutoUpgradeOne() {
  let applyAuto = automaticUpgrades.autoUpgradeOne
  if (applyAuto) {
    genericResource += (applyAuto.multiplier * applyAuto.quantity)
  }
  drawResourceTable()
}

function applyAutoUpgradeTwo() {
  let applyAuto = automaticUpgrades.autoUpgradeTwo
  if (applyAuto) {
    genericResource += (applyAuto.multiplier * applyAuto.quantity)
  }
  drawResourceTable()
}

// [x] when upgrade is purchased, click should gather resources based on upgrade multiplier
function clickOneMultiplier() {
  let clickOne = userClickUpgrades.userClickUpgradeOne
  genericResource += ((clickOne.multiplier * clickOne.quantity))
}

// [x] when upgrade is purchased, click should gather resources based on upgrade multiplier
function clickTwoMultiplier() {
  let clickTwo = userClickUpgrades.userClickUpgradeTwo
  genericResource += (clickTwo.multiplier * clickTwo.quantity)
}

function increaseClickOnePrice() {
  let upOne = userClickUpgrades.userClickUpgradeOne
  console.log("upgrade price increase", upOne.price)
  if (upOne.quantity >= 1) {
    upOne.price += (upOne.quantity * 50)
  }

  drawUpgrades()
}

function increaseClickTwoPrice() {
  let upTwo = userClickUpgrades.userClickUpgradeTwo
  if (upTwo.quantity >= 1) {
    upTwo.price += (upTwo.quantity * 100)
  }
  drawUpgrades()
}

function increaseAutoOnePrice() {
  let autoOne = automaticUpgrades.autoUpgradeOne
  if (autoOne.quantity >= 1) {
    autoOne.price += (autoOne.quantity * 200)
  }
  drawUpgrades()
}

function increaseAutoTwoPrice() {
  let autoTwo = automaticUpgrades.autoUpgradeTwo
  if (autoTwo.quantity >= 1) {
    autoTwo.price += (autoTwo.quantity * 400)
  }
  drawUpgrades()
}

function combineMultipliers() {
  let clickOneTotalMultiplier = 0
  let clickTwoTotalMultiplier = 0
  let autoOneTotalMultiplier = 0
  let autoTwoTotalMultiplier = 0
  let clickMultiplierOne = userClickUpgrades.userClickUpgradeOne
  let clickMultiplierTwo = userClickUpgrades.userClickUpgradeTwo
  let autoOneMultiplier = automaticUpgrades.autoUpgradeOne
  let autoTwoMultiplier = automaticUpgrades.autoUpgradeTwo
  if (clickMultiplierOne.quantity >= 1) {
    clickOneTotalMultiplier = (clickMultiplierOne.quantity * clickMultiplierOne.multiplier)
  }
  if (clickMultiplierTwo.quantity >= 1) {
    clickTwoTotalMultiplier = (clickMultiplierTwo.quantity * clickMultiplierTwo.multiplier)
  }
  if (autoOneMultiplier.quantity >= 1) {
    autoOneTotalMultiplier = (autoOneMultiplier.quantity * autoOneMultiplier.multiplier)
  }
  if (autoTwoMultiplier.quantity >= 1) {
    autoTwoTotalMultiplier = (autoTwoMultiplier.quantity * autoTwoMultiplier.multiplier)
  }
  totalMultiplier = clickOneTotalMultiplier + clickTwoTotalMultiplier + autoOneTotalMultiplier + autoTwoTotalMultiplier
  drawStats()
}

function tallyAutoUpsPerSec() {
  let autoOneMultiplierPerSec = 0
  let autoTwoMultiplierPerSec = 0
  let autoOneMultiplier = automaticUpgrades.autoUpgradeOne
  let autoTwoMultiplier = automaticUpgrades.autoUpgradeTwo
  if (autoOneMultiplier.quantity >= 1) {
    autoOneMultiplierPerSec = (autoOneMultiplier.quantity * 10) / 3
  }
  if (autoTwoMultiplier.quantity >= 1) {
    autoTwoMultiplierPerSec = (autoTwoMultiplier.quantity * 20) / 3
  }
  resourcesPerSecond = autoOneMultiplierPerSec + autoTwoMultiplierPerSec
  drawStats()
}


// [x] invoking function mines 1 unit of resource
// [x] onclick invokes function and results in console.log message
function mineResource() {
  genericResource += 1
  clickOneMultiplier()
  clickTwoMultiplier()
  console.log('generic resource by one', genericResource)
  drawResourceTable()
}

// [x] render element to page that will tally total resources.
function drawResourceTable() {
  let template = ''
  template += `
  <div class="col-8 d-flex resource-table-display justify-content-between p-1">
  <div class="d-flex justify-content-start">
    <h3><b> Inventory</h3></b>
  </div>
  <div>
    <p><b> Generic Resource Total: ${genericResource} </b></p>
  </div>
  <div>
    <p><b> User Click Upgrade One: ${userClickUpgrades.userClickUpgradeOne.quantity} </b></p>
  </div>
  <div>
    <p><b> User Click Upgrade Two: ${userClickUpgrades.userClickUpgradeTwo.quantity}</b></p>
  </div>
  <div>
    <p><b> Automatic Upgrade One: ${automaticUpgrades.autoUpgradeOne.quantity}</b></p>
  </div>
  <div>
    <p><b> Automatic Upgrade Two: ${automaticUpgrades.autoUpgradeTwo.quantity}</b></p>
  </div>
  </div>
  `
  document.getElementById('resource-table').innerHTML = template
}

function drawUpgrades() {
  let template = ''
  template += `
  <div id="upgrade-prices" class="col-6 d-flex button-column">
  <div>
    <h4>Upgrade Prices: </h4>
  </div>
  <p><b>Click Upgrade One: ${userClickUpgrades.userClickUpgradeOne.price} </b></p>
  <p><b>Click Upgrade Two: ${userClickUpgrades.userClickUpgradeTwo.price}</b></p>
  <p><b>Auto Upgrade One: ${automaticUpgrades.autoUpgradeOne.price}</b></p>
  <p><b>Auto Upgrade Two: ${automaticUpgrades.autoUpgradeTwo.price}</b></p>
</div>
  `
  document.getElementById("upgrade-prices").innerHTML = template
}

function drawStats() {
  let template = ''
  template += `
  <div id="stats-table" class="col-8 button-column">
        <h3>Stats:</h3>
        <p><b>Total Multiplier: ${totalMultiplier} </b></p>
        <P><b>Resources Mined per Second: ${resourcesPerSecond.toFixed(2)}</b></P>
      </div>
  `
  document.getElementById('stats-table').innerHTML = template

}



let autoIntervalOne = setInterval(applyAutoUpgradeOne, 3000)
let autoIntervalTwo = setInterval(applyAutoUpgradeTwo, 3000)
drawStats()
drawUpgrades()
drawResourceTable()