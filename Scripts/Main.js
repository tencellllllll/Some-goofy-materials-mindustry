require("radiation-ray");

const protoShard = Vars.content.getByName(ContentType.item, "proto-materials-proto-shard");

Events.on(EventType.Trigger.update, () => {
    Groups.build.each(b => {
        if(b instanceof Drill.DrillBuild){
            let drill = b;
            let targetItem = drill.dominantItem;
            
            if(targetItem != null && targetItem.radioactivity > 0){
                if(drill.timeToMine > 0 && drill.progress >= 0.99){
                    if(Math.random() < 0.15){ // 15% drop chance
                        drill.items.add(protoShard, 1);
                    }
                }
            }
        }
    });
});
