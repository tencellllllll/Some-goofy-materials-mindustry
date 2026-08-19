const rawShard = Vars.content.getByName(ContentType.item, "proto-materials-proto-shard");
const polishedUnstable = Vars.content.getByName(ContentType.item, "proto-shard-polished-unstable");
const stableUnpolished = Vars.content.getByName(ContentType.item, "proto-shard-stable-unpolished");
const polishedStabilized = Vars.content.getByName(ContentType.item, "proto-shard-polished-stabilized");

const protoStabilizer = extend(GenericCrafter, "proto-stabilizer", {
    init(){
        this.super$init();
        this.hasPower = true;
        this.hasItems = true;
    }
});

protoStabilizer.buildType = () => extend(GenericCrafter.GenericCrafterBuild, protoStabilizer, {
    acceptItem(source, item){
        if(this.items.get(item) >= this.block.itemCapacity) return false;
        return item === rawShard || item === polishedUnstable;
    },

    updateTile(){
        if(!this.consValid()) return;

        let inputItem = null;
        let outputItem = null;

        if(this.items.get(rawShard) >= 1){
            inputItem = rawShard;
            outputItem = stableUnpolished;
        } else if(this.items.get(polishedUnstable) >= 1){
            inputItem = polishedUnstable;
            outputItem = polishedStabilized;
        }

        if(inputItem != null && outputItem != null){
            this.progress += this.getProgressIncrease(60);
            if(this.progress >= 1){
                this.items.remove(inputItem, 1);
                this.items.add(outputItem, 1);
                this.progress = 0;
            }
        }
    }
});
