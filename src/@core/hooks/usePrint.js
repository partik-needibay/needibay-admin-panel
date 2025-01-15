import { useCallback, useEffect, useState } from 'react'

function usePrint() {
  const printFunc = useCallback(elId => {
    const contentEl = document.getElementById(elId)

    if (contentEl) {
      contentEl.classList.add('print-div-wrapper')
    }

    window.print()

    contentEl.classList.remove('print-div-wrapper')
  }, [])

  return printFunc

  // print() function
}

export default usePrint
