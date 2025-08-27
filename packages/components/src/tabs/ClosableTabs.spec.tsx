import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { useState } from 'react'
import { Tabs, TabList, Tab, TabPanel, Text, Button } from '../'
import { X } from 'lucide-react'

const ClosableTabsTestComponent = () => {
  const [openTabs, setOpenTabs] = useState([
    { id: 'tab1', title: 'Tab 1' },
    { id: 'tab2', title: 'Tab 2' },
    { id: 'tab3', title: 'Tab 3' },
  ])

  const handleCloseTab = (idToClose: string) => {
    if (openTabs.length > 1) {
      setOpenTabs(prevTabs => prevTabs.filter(tab => tab.id !== idToClose))
    }
  }

  return (
    <Tabs>
      <TabList>
        {openTabs.map(tab => (
          <Tab
            key={tab.id}
            id={tab.id}
            style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}
          >
            {tab.title}
            <Button
              variant='icon'
              onPress={() => handleCloseTab(tab.id)}
              aria-label={`Close ${tab.title}`}
            >
              <X size={16} />
            </Button>
          </Tab>
        ))}
      </TabList>
      {openTabs.map(tab => (
        <TabPanel
          key={tab.id}
          id={tab.id}
        >
          <Text>Content for {tab.title}</Text>
        </TabPanel>
      ))}
    </Tabs>
  )
}

describe('Closable Tabs', () => {
  it('should render tabs with close buttons', () => {
    render(<ClosableTabsTestComponent />)

    expect(screen.getByText('Tab 1')).toBeInTheDocument()
    expect(screen.getByText('Tab 2')).toBeInTheDocument()
    expect(screen.getByText('Tab 3')).toBeInTheDocument()

    expect(screen.getByLabelText('Close Tab 1')).toBeInTheDocument()
    expect(screen.getByLabelText('Close Tab 2')).toBeInTheDocument()
    expect(screen.getByLabelText('Close Tab 3')).toBeInTheDocument()
  })

  it('should close a tab when close button is clicked', () => {
    render(<ClosableTabsTestComponent />)

    const closeButton = screen.getByLabelText('Close Tab 2')
    fireEvent.click(closeButton)

    expect(screen.queryByText('Tab 2')).not.toBeInTheDocument()
    expect(screen.getByText('Tab 1')).toBeInTheDocument()
    expect(screen.getByText('Tab 3')).toBeInTheDocument()
  })

  it('should not close the last remaining tab', () => {
    render(<ClosableTabsTestComponent />)

    // Close two tabs
    fireEvent.click(screen.getByLabelText('Close Tab 2'))
    fireEvent.click(screen.getByLabelText('Close Tab 3'))

    // Try to close the last tab
    fireEvent.click(screen.getByLabelText('Close Tab 1'))

    // The last tab should still be there
    expect(screen.getByText('Tab 1')).toBeInTheDocument()
  })

  it('should update tab content when tabs are closed', () => {
    render(<ClosableTabsTestComponent />)

    // Check initial content
    expect(screen.getByText('Content for Tab 1')).toBeInTheDocument()

    // Close a tab
    fireEvent.click(screen.getByLabelText('Close Tab 1'))

    // Check that the content is no longer there
    expect(screen.queryByText('Content for Tab 1')).not.toBeInTheDocument()
    expect(screen.getByText('Content for Tab 2')).toBeInTheDocument()
  })
})
