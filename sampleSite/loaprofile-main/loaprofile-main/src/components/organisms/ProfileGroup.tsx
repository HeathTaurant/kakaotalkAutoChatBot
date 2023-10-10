import React, { useContext, useEffect } from 'react'
import { LoaContext } from '../../contexts';
import { useSensors, useSensor, KeyboardSensor, DndContext, closestCenter, DragEndEvent, MouseSensor } from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import useWindowDimensions from '../../func/useWindowDimensions';
import { Empty } from 'antd';
import { ColumnFlexDiv, RowFlexDiv } from '../atoms/styles';
import Collection from '../molecules/Collection';
import { CARD_WIDTH } from '../../func/constant';
import Profile from './Profile';
import { isMobile } from 'react-device-detect';



function ProfileGroup() {

    const { setProfiles, profiles, tags } = useContext(LoaContext)
    
    const TripodOpen = tags.includes("7")
    const gridWidth = TripodOpen ? CARD_WIDTH*2 : CARD_WIDTH
    const { width } = useWindowDimensions()
    const colCount = Math.min(profiles.length, TripodOpen ? 1 : 3, Math.max(1, Math.floor(width / gridWidth)))

    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
              delay: 500,
              tolerance: 20,
            },
        })
    );
    
    function handleDragEnd(event: DragEndEvent) {
        const {active, over} = event;

        if (active.id !== over?.id) {
          const oldIndex = profiles.map(a => a.id).indexOf(parseInt(active.id.toString()));
          const newIndex = profiles.map(a => a.id).indexOf(parseInt(over?.id.toString() || '0'));
            
          setProfiles(arrayMove(profiles, oldIndex, newIndex));
          
        }
    }    

    return (
        <RowFlexDiv style={{margin: "10px auto"}}>
            <DndContext 
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={profiles.map(a => a.id)}
                >
                { profiles.length > 0 ?
                    <ColumnFlexDiv id="profile-wrapper" style={{
                        width: "100%"
                    }}> 
                        <div style={{width: (gridWidth+5)*colCount + 2*(colCount-1)}}>
                            <div style={{
                                display: "grid",
                                gap: "2px",
                                justifyContent: width > gridWidth ? "center" : "normal",
                                gridTemplateColumns: `repeat(${colCount}, 1fr)`
                            }}>
                                {tags.includes("0") ? <div style={{
                                    minWidth: `${gridWidth}px`,
                                    gridColumn: `span ${colCount}`,
                                }}>
                                    <Collection info={profiles[0].collectInfo}/>
                                </div> : null}
                                {profiles.map(a => a.id).map((id) => {
                                    const profile = profiles.find(a => a.id === id) || {} as CharInfo;
                                    return <Profile {...profile}/>
                                })}
                            </div>
                        </div>                            
                    </ColumnFlexDiv>
                : <Empty description={"아직 아무것도 없어요..."}/> }
                </SortableContext>
            </DndContext>
        </RowFlexDiv>
                
    )
}

export default ProfileGroup