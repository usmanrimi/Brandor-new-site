"use client"
import React, { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import * as Icons from 'lucide-react';
import Link from 'next/link';

function SortableItem({ member, onDelete }: { member: any, onDelete: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: member.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    background: '#fff',
    zIndex: transform ? 1 : 0,
    position: 'relative' as any,
  };

  return (
    <tr ref={setNodeRef} style={style}>
      <td style={{ paddingLeft: '24px', width: '40px', cursor: 'grab' }} {...attributes} {...listeners}>
        <Icons.GripVertical size={18} color="#cbd5e1" />
      </td>
      <td style={{ paddingLeft: '12px' }}>
        <img src={member.imageUrl} alt={member.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--admin-border)' }} />
      </td>
      <td style={{ fontWeight: '500', color: 'var(--admin-primary)' }}>{member.name}</td>
      <td style={{ color: 'var(--admin-text-light)' }}>{member.role}</td>
      <td style={{ paddingRight: '24px', textAlign: 'right' }}>
        <Link href={`/admin/team/${member.id}`} style={{ color: 'var(--admin-text-light)', marginRight: '16px' }}><Icons.Edit size={18} /></Link>
        <button onClick={() => onDelete(member.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Icons.Trash2 size={18} /></button>
      </td>
    </tr>
  );
}

export default function SortableTeamList({ initialMembers, reorderAction, deleteAction }: { initialMembers: any[], reorderAction: any, deleteAction: any }) {
  const [items, setItems] = useState(initialMembers);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        const newArray = arrayMove(items, oldIndex, newIndex);
        reorderAction(active.id, over.id, newArray);
        return newArray;
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to remove this team member?')) {
      setItems(items.filter(i => i.id !== id));
      await deleteAction(id);
    }
  };

  if (items.length === 0) {
    return <div style={{ padding: '40px', textAlign: 'center', color: 'var(--admin-text-light)' }}>No team members found.</div>;
  }

  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th style={{ paddingLeft: '24px', width: '40px' }}></th>
          <th>Profile</th>
          <th>Name</th>
          <th>Position</th>
          <th style={{ paddingRight: '24px', textAlign: 'right' }}>Actions</th>
        </tr>
      </thead>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
          <tbody>
            {items.map((member) => (
              <SortableItem key={member.id} member={member} onDelete={handleDelete} />
            ))}
          </tbody>
        </SortableContext>
      </DndContext>
    </table>
  );
}
