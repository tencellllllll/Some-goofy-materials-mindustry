const protoShard = Vars.content.getByName(ContentType.item, "proto-materials-proto-shard");
const scrap = Items.scrap;
const pyrite = Items.pyrite;
const phaseFabric = Items.phaseFabric;
const thorium = Items.thorium;

const radiationRay = extend(GenericCrafter, "radiation-ray", {
    init(){
        this.super$init();
        this.hasPower = true;
        this.hasItems = true;
    }
});

radiationRay.buildType = () => extend(GenericCrafter.GenericCrafterBuild, radiationRay, {
    acceptItem(source, item){
        if(this.items.get(item) >= this.block.itemCapacity) return false;

        // Scrap MUST enter from bottom-middle (same X coordinate, below the block)
        if(item === scrap){
            return source != null && source.tileX === this.tileX && source.tileY < this.tileY;
        }

        // Catalysts MUST enter from top-middle (same X coordinate, above the block)
        if(item === pyrite || item === phaseFabric || item === thorium){
            return source != null && source.tileX === this.tileX && source.tileY > this.tileY;
        }

        return false;
    },

    shouldConsume(){
        if(this.items.get(scrap) < 1) return false;
        return this.items.get(thorium) >= 1 || this.items.get(phaseFabric) >= 1 || this.items.get(pyrite) >= 1;
    },

    updateTile(){
        let reqPower = 0;
        let yieldAmount = 0;
        let catalyst = null;

        if(this.items.get(thorium) >= 1){
            catalyst = thorium;
            yieldAmount = 3;
            reqPower = 4000 / 60; // 4000 total power units
        } else if(this.items.get(phaseFabric) >= 1){
            catalyst = phaseFabric;
            yieldAmount = 2;
            reqPower = 2000 / 60; // 2000 total power units
        } else if(this.items.get(pyrite) >= 1){
            catalyst = pyrite;
            yieldAmount = 1;
            reqPower = 400 / 60;  // 400 total power units
        }

        if(catalyst != null && this.items.get(scrap) >= 1 && this.consValid()){
            this.progress += this.getProgressIncrease(60);
            if(this.progress >= 1){
                this.items.remove(scrap, 1);
                this.items.remove(catalyst, 1);
                this.items.add(protoShard, yieldAmount);
                this.progress = 0;
            }
        }
    }
});
