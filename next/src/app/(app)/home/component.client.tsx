'use client';

import { Molecules, Organism, Pages, EmptyTable } from '@kanvas/phoenix/client';
import { Atoms, DropdwonItemInterface } from '@kanvas/phoenix';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { userProfile } from '@/models/state/profile';

const items: DropdwonItemInterface[] = [
  {
    Icon: <Atoms.Icons.Archive size={16} className='stroke-inherit' />,
    text: 'Edit',
    key: 'edit',
  },
  {
    Icon: <Atoms.Icons.Trash size={16} className='stroke-inherit' />,
    text: 'Delete',
    key: 'delete',
  },
];

const columns = [
  {
    accessorKey: 'title',
    header: () => 'Title',
    footer: (props: any) => props.column.id,
  },
  {
    accessorKey: 'company',
    header: () => 'Company',
    footer: (props: any) => props.column.id,
  },
  {
    accessorKey: 'description',
    header: () => 'Description',
    footer: (props: any) => props.column.id,
  },
  {
    accessorKey: 'uw-note',
    header: () => 'uw notes',
    footer: (props: any) => props.column.id,
  },
  {
    accessorKey: 'create-date',
    header: () => 'Created date',
    footer: (props: any) => props.column.id,
  },
];

const STATUS_OPTIONS = ['ADMIN', 'USER'];

export default function ClientComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useAtom(userProfile);
  // const profile = JSON.parse(localStorage.getItem("user")!)

  const handleChange = (item: DropdwonItemInterface) => {
    console.log(item);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Molecules.Dropdown items={items} onChange={handleChange}>
        <div className='p-3 bg-slate-400'></div>
      </Molecules.Dropdown>
      <Organism.SettingsModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className='flex items-center p-3'>
          <Atoms.Heading.Six>Settings</Atoms.Heading.Six>
        </div>
        {/* <Pages.SettingsView view={0} handleView={() => {}} profile={profile} /> */}
        <Pages.ChangePasswordView />
        {/* <Pages.ProfileView profile={profile} setProfile={setProfile}/> */}
      </Organism.SettingsModal>
      <Molecules.Select
        name={'permissions'}
        className='w-40'
        placeholder={'permissions'}
        options={STATUS_OPTIONS}
      />
      <EmptyTable columns={columns} loading={false} text='Table is empty'  />
    </>
  );
}