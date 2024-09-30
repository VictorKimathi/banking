import BankCard from '@/components/BankCard';
import HeaderBox from '@/components/HeaderBox'

import React from 'react'

const MyBanks = async () => {
  
const accounts = {data:[],id:1}
const loggedIn  = {firstName:"Victor" ,lastNmae:"codes", email :"codes@gmail.com"}
return (
    <section className='flex'>
      <div className="my-banks">
        <HeaderBox 
          title="My Bank Accounts"
          subtext="Effortlessly manage your banking activites."
        />

        <div className="space-y-4">
          <h2 className="header-2">
            Your cards
          </h2>
          <div className="flex flex-wrap gap-6">
            {accounts && accounts.data.map((a: Account) => (
              <BankCard 
                key={accounts.id}
                account={a}
                userName={loggedIn?.firstName}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MyBanks