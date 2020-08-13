//import { shopAnim } from './game'

import { WearableData, Wearable } from './wearables'
import * as marketplace from '../node_modules/decentraland-crypto-utils/marketplace/index'

import { splitTextIntoLines, roundNumber } from './helperFunctions'
export const screenSpaceUI = new UICanvas()
screenSpaceUI.visible = true

let UIOpenTime

const scale = 0.55

export function updateOpenUITime() {
  UIOpenTime = +Date.now()
}

// open dialog
export const openDialogSound = new Entity()
openDialogSound.addComponent(new Transform())
// This seems to work even when the player moves as oppose to getting the transform from the item
// as the items transform might not be matching their position visuallly
openDialogSound.getComponent(Transform).position = Camera.instance.position
let uiForward = new AudioClip('sounds/navigationForward.mp3')
openDialogSound.addComponent(new AudioSource(uiForward))
engine.addEntity(openDialogSound)

// close dialog
export const closeDialogSound = new Entity()
closeDialogSound.addComponent(new Transform())
closeDialogSound.getComponent(Transform).position = Camera.instance.position
let uiBackward = new AudioClip('sounds/navigationBackward.mp3')
closeDialogSound.addComponent(new AudioSource(uiBackward))
engine.addEntity(closeDialogSound)

let SFFont = new Font(Fonts.SanFrancisco)
let SFHeavyFont = new Font(Fonts.SanFrancisco_Heavy)

const wearableBackground = new Texture('images/wearablesModal.png')
const UIElements = new Texture('images/UIElements.png')

let wBackground = new UIImage(screenSpaceUI, wearableBackground)
wBackground.visible = false

let disclaimerBG = new UIImage(screenSpaceUI, UIElements)
disclaimerBG.visible = false

let successMessage = new UIImage(screenSpaceUI, UIElements)
successMessage.visible = false

const wearableColors = new Texture('images/wearable-colors.png')
const loadingIcon = new Texture('images/clockIcon.png')

export function openLoadingUI() {
  updateOpenUITime()
  wBackground.visible = false
  wBackground = new UIImage(screenSpaceUI, loadingIcon)
  wBackground.visible = true
  wBackground.sourceTop = 0
  wBackground.sourceLeft = 0
  wBackground.sourceHeight = 58
  wBackground.sourceWidth = 36
  wBackground.height = 58
  wBackground.width = 36
  wBackground.hAlign = 'center'
  wBackground.vAlign = 'center'
}

export function closeUI() {
  wBackground.visible = false
  wBackground.isPointerBlocker = false
  disclaimerBG.visible = false
  disclaimerBG.isPointerBlocker = false
  successMessage.visible = false
  successMessage.isPointerBlocker = false
}

export function wearableClassic(wearable: Entity) {
  updateOpenUITime()
  wBackground.visible = false
  openDialogSound.getComponent(AudioSource).playOnce()

  wBackground = new UIImage(screenSpaceUI, wearableBackground)
  wBackground.name = 'wearablebackground'
  wBackground.visible = true
  wBackground.positionY = 100
  wBackground.sourceTop = 14
  wBackground.sourceLeft = 16
  wBackground.sourceHeight = 48
  wBackground.sourceWidth = 301
  wBackground.height = 48
  wBackground.width = 301
  wBackground.hAlign = 'center'
  wBackground.vAlign = 'center'
}

export function wearableNotForSale(wearable: Entity) {
  updateOpenUITime()
  wBackground.visible = false
  openDialogSound.getComponent(AudioSource).playOnce()

  wBackground = new UIImage(screenSpaceUI, wearableBackground)
  wBackground.name = 'wearablebackground'
  wBackground.visible = true
  wBackground.positionY = 100
  wBackground.sourceTop = 75
  wBackground.sourceLeft = 13
  wBackground.sourceHeight = 54
  wBackground.sourceWidth = 255
  wBackground.height = 48
  wBackground.width = 249
  wBackground.hAlign = 'center'
  wBackground.vAlign = 'center'
}

export async function openWearableUI(
  wearable: Wearable,
  wearableData: WearableData
) {
  updateOpenUITime()
  wBackground.visible = false
  openDialogSound.getComponent(AudioSource).playOnce()

  const wearableThumnail = new Texture(wearableData.image)

  let backgroundOffset = -70

  wBackground = new UIImage(screenSpaceUI, wearableBackground)
  wBackground.name = 'wearablebackground'
  wBackground.visible = true
  wBackground.positionY = backgroundOffset
  wBackground.sourceTop = 186
  wBackground.sourceLeft = 6
  wBackground.sourceHeight = 461
  wBackground.sourceWidth = 385
  wBackground.height = 461
  wBackground.width = 385
  wBackground.hAlign = 'center'
  wBackground.vAlign = 'center'

  const wRarityColor = new UIImage(wBackground, wearableColors)
  wRarityColor.name = 'wearableRarityColor'
  wRarityColor.positionY = 461 / 2 + 15 - backgroundOffset
  wRarityColor.width = 385
  wRarityColor.height = 175
  wRarityColor.hAlign = 'center'
  wRarityColor.vAlign = 'center'
  wRarityColor.sourceWidth = 385
  wRarityColor.sourceHeight = 175

  switch (wearableData.wearable.rarity) {
    case 'unique':
      wRarityColor.sourceLeft = 0
      wRarityColor.sourceTop = 0
      break
    case 'mythic':
      wRarityColor.sourceLeft = 0
      wRarityColor.sourceTop = 175
      break
    case 'legendary':
      wRarityColor.sourceLeft = 0
      wRarityColor.sourceTop = 350
      break
    case 'epic':
      wRarityColor.sourceLeft = 0
      wRarityColor.sourceTop = 350 + 175
      break
    case 'uncommon':
      wRarityColor.sourceLeft = 385
      wRarityColor.sourceTop = 350
      break
    case 'common':
      wRarityColor.sourceLeft = 385
      wRarityColor.sourceTop = 175
      break
    case 'rare':
      wRarityColor.sourceLeft = 385
      wRarityColor.sourceTop = 175 + 350
      break
    case 'swanky': // redundant, but left just in case
      wRarityColor.sourceLeft = 385
      wRarityColor.sourceTop = 175 + 350
      break
  }

  let closeIcon = new UIImage(wBackground, UIElements)
  closeIcon.name = 'closeIcon'
  closeIcon.visible = true
  closeIcon.positionY = 461 / 2 + 144
  closeIcon.positionX = 354 / 2
  closeIcon.sourceTop = 4
  closeIcon.sourceLeft = 328
  closeIcon.sourceHeight = 24
  closeIcon.sourceWidth = 24
  closeIcon.height = 24
  closeIcon.width = 24
  closeIcon.hAlign = 'center'
  closeIcon.vAlign = 'center'
  closeIcon.onClick = new OnClick(() => {
    closeDialogSound.getComponent(AudioSource).playOnce()
    closeUI()
  })

  const thumnail = new UIImage(wBackground, wearableThumnail)
  thumnail.name = 'wearableThumbnail'
  thumnail.width = 256
  thumnail.height = 256
  thumnail.hAlign = 'center'
  thumnail.vAlign = 'center'
  thumnail.positionY = 461 / 2
  thumnail.sourceLeft = 0
  thumnail.sourceTop = 0
  thumnail.sourceWidth = 256
  thumnail.sourceHeight = 256

  const name = new UIText(wBackground)
  name.name = 'wearableName'
  name.value = wearableData.name
  name.hTextAlign = 'center'
  name.vAlign = 'center'
  name.hAlign = 'center'
  name.fontSize = 16
  name.positionY = 461 / 2 + 121
  name.color = Color4.White()
  name.font = SFHeavyFont

  const rarity = new UIText(wBackground)
  rarity.name = 'wearableRarity'
  rarity.hTextAlign = 'center'
  rarity.value = wearableData.wearable.rarity.toLocaleUpperCase()
  rarity.vAlign = 'center'
  rarity.hAlign = 'center'
  rarity.fontSize = 16
  rarity.positionY = 461 / 2 + 142
  rarity.color = Color4.FromHexString('#FFFFFF88')
  rarity.font = SFHeavyFont

  let parsedDesc = wearableData.wearable.description
  if (parsedDesc.length > 45) {
    parsedDesc = parsedDesc.slice(0, 45) + parsedDesc.replace(/(.{45})/g, '\n')
  }

  const desc = new UIText(wBackground)
  desc.name = 'wearableDesc'
  desc.value = parsedDesc
  desc.vAlign = 'center'
  desc.hAlign = 'center'
  desc.fontSize = 15
  desc.positionY = 461 / 2 - 275
  desc.positionX = -385 / 2 + 29 + 5
  desc.width = 10
  desc.hTextAlign = 'left'
  desc.color = Color4.Black()
  desc.font = SFFont

  let shortenedOwner =
    wearableData.owner.address.slice(0, 5) +
    '...' +
    wearableData.owner.address.slice(wearableData.owner.address.length - 4)

  const owner = new UIText(wBackground)
  owner.name = 'wearableOwner'
  owner.value = shortenedOwner
  owner.vAlign = 'center'
  owner.hAlign = 'center'
  owner.fontSize = 15
  owner.positionY = 461 / 2 - 119 + 5
  owner.positionX = -385 / 2 + 29 + 5
  owner.width = 10
  owner.hTextAlign = 'left'
  owner.color = Color4.Black()
  owner.font = SFFont

  const collection = new UIText(wBackground)
  collection.name = 'wearableCollection'
  collection.value = wearableData.wearable.collection
  collection.vAlign = 'center'
  collection.hAlign = 'center'
  collection.fontSize = 15
  collection.positionY = 461 / 2 - 185 + 5
  collection.positionX = -385 / 2 + 29 + 5
  collection.width = 10
  collection.hTextAlign = 'left'
  collection.color = Color4.Black()
  collection.font = SFFont

  const category = new UIText(wBackground)
  category.name = 'wearableCategory'
  category.value = wearableData.wearable.category
  category.vAlign = 'center'
  category.hAlign = 'center'
  category.fontSize = 15
  category.positionY = 461 / 2 - 185 + 5
  category.positionX = -385 / 2 + 205 + 5
  category.width = 10
  category.color = Color4.Black()
  category.font = SFFont

  let genderString: string
  if (wearableData.wearable.bodyShapes.length == 2) {
    genderString = 'Unisex'
  } else {
    if (wearableData.wearable.bodyShapes[0] == 'BaseMale') {
      genderString = 'Male'
    } else {
      genderString = 'Female'
    }
  }

  const gender = new UIText(wBackground)
  gender.name = 'wearableGender'
  gender.value = genderString
  gender.vAlign = 'center'
  gender.hAlign = 'center'
  gender.fontSize = 15
  gender.positionY = 461 / 2 - 210 + 5
  gender.positionX = -385 / 2 + 205 + 5
  gender.width = 10
  gender.color = Color4.Black()
  gender.font = SFFont

  //const permissions = await marketplace.isAuthorizedAll()
  //TODO just check wearable contract

  if (true) {
    //permissions.buying.mana.authorized == true) {
    showBuyUISection(wBackground, wearableData)
  } else {
    // MISSING PERMISSIONS
    showDisclaimerNoPermission(wBackground)

    // run system w checkAllowance() every x seconds
    // let checkApprove = new CheckPermissionSystem(1, wBackground, wearableData)
    // engine.addSystem(checkApprove)
  }
}

export async function showBuyUISection(
  background: UIImage,
  wearableData: WearableData
) {
  if (wearableData.wearable.description) {
    let parsedDesc = wearableData.wearable.description
    if (parsedDesc.length > 45) {
      parsedDesc =
        parsedDesc.slice(0, 45) + parsedDesc.replace(/(.{45})/g, '\n')
    }

    const desc = new UIText(wBackground)
    desc.name = 'wearableDesc'
    desc.value = parsedDesc
    desc.vAlign = 'center'
    desc.hAlign = 'center'
    desc.fontSize = 15
    desc.positionY = 461 / 2 - 275
    desc.positionX = -385 / 2 + 29 + 5
    desc.width = 10
    desc.hTextAlign = 'left'
    desc.color = Color4.Black()
    desc.font = SFFont
  }

  const button = new UIImage(wBackground, UIElements)
  button.name = 'wButton'
  button.hAlign = 'center'
  button.vAlign = 'center'
  button.width = 322
  button.height = 44
  button.positionY = 461 / 2 - 395 - 20 + 9
  button.sourceLeft = 1
  button.sourceTop = 138
  button.sourceWidth = 322
  button.sourceHeight = 44

  let formattedPrice = roundNumber(
    wearableData.searchOrderPrice / 1000000000000000000,
    4
  )

  const price = new UIText(wBackground)
  price.name = 'wearablePrice'
  price.value = String(formattedPrice)
  price.vAlign = 'center'
  price.hAlign = 'center'
  price.fontSize = 15
  price.positionY = 461 / 2 - 395 + 6
  price.positionX = -385 / 2 + 191 + 5 + 20
  price.width = 10
  price.hTextAlign = 'left'
  price.color = Color4.White()
  price.font = SFFont

  let balance = 100000 //await getBalance()     TODO, get real balance

  log('player balance: ', balance)

  if (balance > formattedPrice) {
    price.value = formattedPrice.toString()

    button.sourceTop = 112 + 30
    button.sourceWidth = 322
    button.sourceHeight = 44
    button.onClick = new OnClick(async () => {
      await marketplace.createOrder(
        wearableData.contractAddress,
        Number(wearableData.tokenId),
        wearableData.searchOrderPrice
      )

      closeUI()

      successMessage = new UIImage(wBackground, UIElements)

      successMessage.hAlign = 'center'
      successMessage.vAlign = 'center'
      successMessage.visible = true
      successMessage.width = 396
      successMessage.height = 46
      successMessage.positionY = 0
      successMessage.sourceLeft = 6
      successMessage.sourceTop = 325 + 28
      successMessage.sourceWidth = 396
      successMessage.sourceHeight = 46
      successMessage.onClick = new OnClick(() => {
        closeUI()
      })
    })
  } else {
    // NOT ENOUGH MANA

    button.sourceLeft = 0
    button.sourceTop = 34 + 30
    button.sourceWidth = 322
    button.sourceHeight = 44
    button.onClick = new OnClick(() => {
      closeUI()
    })

    price.value = 'Insufficient MANA to buy'
    price.hAlign = 'center'
    price.positionX = -75
  }
}

export function showDisclaimerNoPermission(background: UIImage) {
  disclaimerBG = new UIImage(background, UIElements)
  disclaimerBG.name = 'DcBG'
  disclaimerBG.hAlign = 'center'
  disclaimerBG.vAlign = 'center'
  disclaimerBG.width = 385
  disclaimerBG.height = 165
  disclaimerBG.positionY = 461 / 2 - 313.5 - 69
  disclaimerBG.sourceLeft = 3
  disclaimerBG.sourceTop = 423 + 32
  disclaimerBG.sourceWidth = 421
  disclaimerBG.sourceHeight = 165
  disclaimerBG.visible = true

  const disclaimerSting =
    'To buy this item, you must first allow the Marketplace contract\nto operate with MANA on your behalf.'

  const disclaimer = new UIText(disclaimerBG)
  disclaimer.name = 'wearableDisclaimer'
  disclaimer.value = disclaimerSting
  disclaimer.vAlign = 'center'
  disclaimer.hAlign = 'center'
  disclaimer.fontSize = 12
  disclaimer.positionY = 97 + 27 - 82.5 + 10
  disclaimer.positionX = 0
  disclaimer.width = 10
  disclaimer.hTextAlign = 'center'
  disclaimer.color = Color4.Red()
  disclaimer.font = SFFont

  const allowButton = new UIImage(disclaimerBG, UIElements)
  allowButton.name = 'wButton'
  allowButton.hAlign = 'center'
  allowButton.vAlign = 'center'
  allowButton.width = 322
  allowButton.height = 44
  allowButton.positionY = 34 + 22 - 82.5
  allowButton.sourceLeft = 0
  allowButton.sourceTop = 34 + 30
  allowButton.sourceWidth = 322
  allowButton.sourceHeight = 44
  allowButton.onClick = new OnClick(async () => {
    //await approveContract()
    // TODO approve contract

    let loading = new UIImage(disclaimerBG, UIElements)
    loading.visible = true
    loading.sourceTop = 0
    loading.sourceLeft = 52
    loading.sourceHeight = 32.42
    loading.sourceWidth = 22.49
    loading.height = 32.42
    loading.width = 22.49
    loading.hAlign = 'center'
    loading.vAlign = 'center'
    loading.positionY = 104 + 16 - 82.5

    allowButton.visible = false
    buttonLabel.visible = false

    disclaimer.value =
      "Processing your contract transaction. Once it succeeds,\nyou'll be able to buy this item!"
    disclaimer.positionY = 34 + 27 - 82.5
    disclaimer.color = Color4.Black()
  })

  const buttonLabel = new UIText(allowButton)
  buttonLabel.name = 'wearableDisclaimer'
  buttonLabel.value = 'ALLOW'
  buttonLabel.vAlign = 'center'
  buttonLabel.hAlign = 'center'
  buttonLabel.fontSize = 15
  buttonLabel.positionY = 17
  buttonLabel.positionX = 0
  buttonLabel.width = 10
  buttonLabel.hTextAlign = 'center'
  buttonLabel.color = Color4.White()
  buttonLabel.font = SFFont
}

/////// CLOSE UI

// Instance the input object
const input = Input.instance

//button down event
input.subscribe('BUTTON_DOWN', ActionButton.POINTER, false, (e) => {
  const currentTime = +Date.now()
  let isOpen: boolean
  if (wBackground.visible || disclaimerBG.visible || successMessage.visible) {
    isOpen = true
  } else {
    isOpen = false
  }

  if (isOpen && currentTime - UIOpenTime > 100) {
    closeUI()
    log('clicked on the close image ', wBackground.visible)
  }
})

export class CheckPermissionSystem {
  permission: boolean = false
  timer: number
  updateInterval: number
  background: UIImage
  wearableData: WearableData
  async update(dt: number) {
    if (this.permission == true) return
    this.timer -= dt

    if (this.timer < 0) {
      this.timer = this.updateInterval
      if (true) {
        //await marketplace.isAuthorizedAll()) {
        // TODO: check only wearable contract
        this.permission = true
        this.timer = this.updateInterval
        disclaimerBG.visible = false
        disclaimerBG.isPointerBlocker = false

        showBuyUISection(this.background, this.wearableData)

        log('Approve transaction done!!! ')
        engine.removeSystem(this)
      }
    }
  }
  constructor(
    updateInterval: number,
    background: UIImage,
    wearableData: WearableData
  ) {
    this.updateInterval = updateInterval
    this.timer = updateInterval
    this.background = background
    this.wearableData = wearableData
  }
}
