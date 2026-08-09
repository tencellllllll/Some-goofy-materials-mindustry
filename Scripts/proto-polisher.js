const rawShard = Vars.content.getByName(ContentType.item, "proto-materials-proto-shard");
const polishedUnstable = Vars.content.getByName(ContentType.item, "proto-materials-proto-shard-polished-unstable");
const stableUnpolished = Vars.content.getByName(ContentType.item, "proto-materials-proto-shard-stable-unpolished");
const polishedStabilized = Vars.content.getByName(ContentType.item, "proto-materials-proto-shard-polished-stabilized");

const protoPolisher = extend(GenericCrafter, "proto-polisher", {
    init(){
        this.super$init();
        this.hasPower = true;
        this.hasItems = true;
    }
});

protoPolisher.buildType = () => extend(GenericCrafter.GenericCrafterBuild, protoPolisher, {
    acceptItem(source, item){
        if(this.items.get(item) >= this.block.itemCapacity) return false;
        return item === rawShard || item === stableUnpolished;
    },

    updateTile(){
        if(!this.consValid()) return;

        let inputItem = null;
        let outputItem = null;

        if(this.items.get(rawShard) >= 1){
            inputItem = rawShard;
            outputItem = polishedUnstable;
        } else if(this.items.get(stableUnpolished) >= 1){
            inputItem = stableUnpolished;
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
