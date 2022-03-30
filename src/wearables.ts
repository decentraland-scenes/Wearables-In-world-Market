import {
  openLoadingUI,
  openWearableUI,
  wearableClassic,
  wearableNotForSale,
} from './ui'

export class Wearable extends Entity {
  wearableName: string
  model: GLTFShape
  id: string
  isDefault: boolean = false
  wearableData: WearableData
  constructor(
    model: GLTFShape,
    transform: TranformConstructorArgs,
    wearableName: string,
    isDefault?: boolean
  ) {
    super()
    engine.addEntity(this)

    this.addComponent(model)
    this.addComponent(new Transform(transform))

    if (isDefault) {
      this.isDefault = true
    }
    this.wearableName = wearableName.toLocaleLowerCase()
    const thisWearable = this

    this.addComponent(
      new OnPointerDown(
        async function () {
          if (thisWearable.isDefault) {
            wearableClassic(thisWearable)
            log(
              'This item is part of the classic collection of wearables. You can find it in your inventory.'
            )
          } else {
            openLoadingUI()
            const info = await getWearableOnSale(
              wearableName.toLocaleLowerCase()
            )
            if (info.data.nfts.length > 0) {
              thisWearable.wearableData = info.data.nfts[0]
              openWearableUI(thisWearable, info.data.nfts[0]).catch((error) =>
                log(error)
              )
            } else {
              wearableNotForSale(thisWearable)
              log('no results')
            }
          }
          // openUI1(wearableName, this)
        },
        {
          button: ActionButton.PRIMARY,
          hoverText: 'Info',
        }
      )
    )
  }

  //   public buy(): void {

  //   }
}

export type WearableData = {
  activeOrder: { id: string }
  id: string
  name: string
  owner: { address: string }
  contractAddress: string
  tokenId: string
  image: string
  searchOrderPrice: number
  searchOrderStatus: string
  wearable: {
    bodyShapes: string[]
    category: string
    collection: string
    description: string
    name: string
    rarity: string
    representationId: string
  }
}

async function getWearableOnSale(wearableName: string) {
  const now = String(Math.floor(Date.now() / 1000))
  const query =
    `
		{
			nfts(first: 1,  orderBy: searchOrderPrice, orderDirection: asc, where:{ category: wearable, searchText: "` +
    wearableName +
    `", searchOrderStatus:open, searchOrderExpiresAt_gt:` +
    now +
    `
		  }) {
			  id
			name
			image
			contractAddress
			tokenId
			wearable{ name, representationId, collection, description, category, rarity, bodyShapes }
			searchOrderPrice
			searchOrderStatus
			owner{address}
			activeOrder {
				id
			  }
			}
		}`

  log('query: ', query)

  // const variables = { x, y }
  try {
    const response = queryGraph(query)
    log('wearable info: ', await response)
    return response
  } catch (error) {
    log(`Error fetching wearable dat `, error)
    throw error
  }
}

async function queryGraph(query: string) {
  const url = 'https://api.thegraph.com/subgraphs/name/decentraland/marketplace'
  const opts = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  }
  const res = await fetch(url, opts)
  return res.json()
}

export function getWearableURL(wearable: WearableData) {
  return (
    'https://market.decentraland.org/contracts/' +
    wearable.contractAddress +
    '/tokens/' +
    wearable.tokenId
  )
}

export function addWearables() {
  //////// WEARABLES

  // FLOOR 1

  const Eyewear_MANA = new Wearable(
    new GLTFShape('models/wearables/A/MANA_Eyewear.glb'),
    {
      position: new Vector3(2.4, 1.5, 2.2),
      rotation: Quaternion.Euler(0, 60, 0),
    },
    'MANA Eyewear'
  )

  const Spysuit_Goggles = new Wearable(
    new GLTFShape('models/wearables/A/Spysuit_Goggles.glb'),
    {
      position: new Vector3(2.4, 1.5, 4.2),
      rotation: Quaternion.Euler(0, 60, 0),
    },
    'Spy Suit Eyewear'
  )

  const Eye_Thingy = new Wearable(
    new GLTFShape('models/wearables/A/Eyewear_Raver.glb'),
    {
      position: new Vector3(2.4, 1.5, 6.2),
      rotation: Quaternion.Euler(0, 60, 0),
    },
    'Raver Goggles'
  )

  const Umbrella_Hat = new Wearable(
    new GLTFShape('models/wearables/B/Umbrella_Hat.glb'),
    {
      position: new Vector3(7.9, 1.5, 2.2),
      rotation: Quaternion.Euler(0, 270, 0),
    },
    'Umbrella Hat'
  )

  const M_Hat_Hat_of_Wonder = new Wearable(
    new GLTFShape('models/wearables/B/M_Hat_Hat_of_Wonder.glb'),
    {
      position: new Vector3(7.9, 1.5, 4.2),
      rotation: Quaternion.Euler(0, 270, 0),
    },
    'Hat of Wonder'
  )

  const MaleHat_MANA = new Wearable(
    new GLTFShape('models/wearables/B/MaleHat_MANA.glb'),
    {
      position: new Vector3(7.9, 1.5, 6.2),
      rotation: Quaternion.Euler(0, 270, 0),
    },
    'MANA Hat'
  )

  const m_barbarian_helmet_hat = new Wearable(
    new GLTFShape('models/wearables/C/m_barbarian_helmet_hat.glb'),
    {
      position: new Vector3(13.4, 1.5, 2.2),
      rotation: Quaternion.Euler(0, 60, 0),
    },
    'Barbarian Helmet'
  )

  const cw_fox_top_head = new Wearable(
    new GLTFShape('models/wearables/C/cw_fox_top_head.glb'),
    {
      position: new Vector3(13.4, 1.5, 4.2),
      rotation: Quaternion.Euler(0, 60, 0),
    },
    'Fox Hat'
  )

  const xmas_snowman_helmet = new Wearable(
    new GLTFShape('models/wearables/C/xmas_snowman_helmet.glb'),
    {
      position: new Vector3(13.4, 1.5, 6.2),
      rotation: Quaternion.Euler(0, 60, 0),
    },
    'Snowman Head'
  )

  // Second row

  const asian_fox = new Wearable(
    new GLTFShape('models/wearables/D/asian_fox.glb'),
    {
      position: new Vector3(2.4, 1.5, 10),
      rotation: Quaternion.Euler(0, 90, 0),
    },
    'Asian Fox Mask'
  )

  const tropical_mask = new Wearable(
    new GLTFShape('models/wearables/D/tropical_mask.glb'),
    {
      position: new Vector3(2.4, 1.5, 12),
      rotation: Quaternion.Euler(0, 90, 0),
    },
    'Tropical Mask'
  )

  const muzzle_mask = new Wearable(
    new GLTFShape('models/wearables/D/muzzle_mask.glb'),
    {
      position: new Vector3(2.4, 1.5, 14),
      rotation: Quaternion.Euler(0, 90, 0),
    },
    'Muzzle Mask'
  )

  const razor_blade_feet = new Wearable(
    new GLTFShape('models/wearables/E/razor_blade_feet.glb'),
    {
      position: new Vector3(7.9, 0.75, 10),
      rotation: Quaternion.Euler(0, 115, 0),
    },
    'Razor Blade Shoes'
  )

  const cw_city_sneakers_feet = new Wearable(
    new GLTFShape('models/wearables/E/cw_city_sneakers_feet.glb'),
    {
      position: new Vector3(7.9, 0.9, 12),
      rotation: Quaternion.Euler(0, 115, 0),
    },
    'City Decentraland Sneakers'
  )

  const sad_clown_feet = new Wearable(
    new GLTFShape('models/wearables/E/sad_clown_feet.glb'),
    {
      position: new Vector3(7.9, 0.75, 14),
      rotation: Quaternion.Euler(0, 115, 0),
    },
    'Sad Clown Shoes'
  )

  const M_Feet_BearSlippers = new Wearable(
    new GLTFShape('models/wearables/F/M_Feet_BearSlippers.glb'),
    {
      position: new Vector3(13.4, 0.75, 10),
      rotation: Quaternion.Euler(0, 270, 0),
    },
    'Bear Slippers',
    true
  )

  const M_Feet_ClassiShoes = new Wearable(
    new GLTFShape('models/wearables/F/M_Feet_ClassiShoes.glb'),
    {
      position: new Vector3(13.4, 0.75, 12),
      rotation: Quaternion.Euler(0, 270, 0),
    },
    'Classic Shoes',
    true
  )

  const F_Feet_Shoes_01 = new Wearable(
    new GLTFShape('models/wearables/F/F_Feet_Shoes_01.glb'),
    {
      position: new Vector3(13.4, 0.75, 14),
      rotation: Quaternion.Euler(0, 270, 0),
    },
    'Classic shoes',
    true
  )
}
