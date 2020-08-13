import { addWearables } from './wearables'

Input.instance.subscribe('BUTTON_DOWN', ActionButton.PRIMARY, false, (e) => {
  log(`pos: `, Camera.instance.position)
  log(`rot: `, Camera.instance.rotation)
})

addWearables()

const _scene = new Entity('_scene')
engine.addEntity(_scene)
const transform = new Transform({
  position: new Vector3(0, 0, 0),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1),
})
_scene.addComponentOrReplace(transform)

const entity = new Entity('entity')
engine.addEntity(entity)
entity.setParent(_scene)
const gltfShape = new GLTFShape('models/FloorBaseWood_01/FloorBaseWood_01.glb')
gltfShape.withCollisions = true
gltfShape.isPointerBlocker = true
gltfShape.visible = true
entity.addComponentOrReplace(gltfShape)
const transform2 = new Transform({
  position: new Vector3(8, 0, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1),
})
entity.addComponentOrReplace(transform2)

const stand = new Entity('stand')
engine.addEntity(stand)
stand.setParent(_scene)
const transform3 = new Transform({
  position: new Vector3(2.5, 0, 12),
  rotation: new Quaternion(
    -1.9771356233932785e-15,
    -0.7071068286895752,
    8.429369557916289e-8,
    0.7071068286895752
  ),
  scale: new Vector3(1.0000078678131104, 1, 1.0000078678131104),
})
stand.addComponentOrReplace(transform3)
const gltfShape2 = new GLTFShape('models/stand.glb')
gltfShape2.withCollisions = true
gltfShape2.isPointerBlocker = true
gltfShape2.visible = true
stand.addComponentOrReplace(gltfShape2)

const stand2 = new Entity('stand2')
engine.addEntity(stand2)
stand2.setParent(_scene)
stand2.addComponentOrReplace(gltfShape2)
const transform4 = new Transform({
  position: new Vector3(2.5, 0, 4),
  rotation: new Quaternion(
    -1.9771356233932785e-15,
    -0.7071068286895752,
    8.429369557916289e-8,
    0.7071068286895752
  ),
  scale: new Vector3(1.0000081062316895, 1, 1.0000081062316895),
})
stand2.addComponentOrReplace(transform4)

const stand3 = new Entity('stand3')
engine.addEntity(stand3)
stand3.setParent(_scene)
stand3.addComponentOrReplace(gltfShape2)
const transform5 = new Transform({
  position: new Vector3(8, 0, 12),
  rotation: new Quaternion(
    -1.9771356233932785e-15,
    -0.7071068286895752,
    8.429369557916289e-8,
    0.7071068286895752
  ),
  scale: new Vector3(1.0000150203704834, 1, 1.0000150203704834),
})
stand3.addComponentOrReplace(transform5)

const stand4 = new Entity('stand4')
engine.addEntity(stand4)
stand4.setParent(_scene)
stand4.addComponentOrReplace(gltfShape2)
const transform6 = new Transform({
  position: new Vector3(8, 0, 4),
  rotation: new Quaternion(
    -1.9771356233932785e-15,
    -0.7071068286895752,
    8.429369557916289e-8,
    0.7071068286895752
  ),
  scale: new Vector3(1.000014305114746, 1, 1.000014305114746),
})
stand4.addComponentOrReplace(transform6)

const stand5 = new Entity('stand5')
engine.addEntity(stand5)
stand5.setParent(_scene)
stand5.addComponentOrReplace(gltfShape2)
const transform7 = new Transform({
  position: new Vector3(13.5, 0, 12),
  rotation: new Quaternion(
    -1.9771356233932785e-15,
    -0.7071068286895752,
    8.429369557916289e-8,
    0.7071068286895752
  ),
  scale: new Vector3(1.0000145435333252, 1, 1.0000145435333252),
})
stand5.addComponentOrReplace(transform7)

const stand6 = new Entity('stand6')
engine.addEntity(stand6)
stand6.setParent(_scene)
stand6.addComponentOrReplace(gltfShape2)
const transform8 = new Transform({
  position: new Vector3(13.5, 0, 4),
  rotation: new Quaternion(
    -1.9771356233932785e-15,
    -0.7071068286895752,
    8.429369557916289e-8,
    0.7071068286895752
  ),
  scale: new Vector3(1.0000147819519043, 1, 1.0000147819519043),
})
stand6.addComponentOrReplace(transform8)
