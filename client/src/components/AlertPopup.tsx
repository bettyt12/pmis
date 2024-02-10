function AlertPopup ({
    message,
    Close,
    onSubmit,
    isLoading
  }: {
    message: string
    Close: () => void
    onSubmit?: () => void
    isLoading?: boolean
  }) {
    console.log(isLoading);
    
    return (
      <div className=' fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50 '>
        <div className='bg-white max-w-md p-8 rounded-lg  '>
          <p className=' text-xl font-bold '>{message}</p>
          <p className='  text-gray-400 font-medium mt-2'>
            This action cannot be undone
          </p>
          <div className='flex justify-between gap-x-4 mt-14 '>
            <button
              onClick={Close}
              type='submit'
              className=' w-full   font-semibold  bg-[#F0F0F0]  text-[#2E2E2E] px-14 rounded py-4 '
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              type='submit'
              className=' w-full   font-semibold  bg-[#2e2e2e] hover:bg-[#2e2e2eed] text-white px-14 rounded py-4 '
            >
              {isLoading ? (
                <div
                  className='loader mx-auto h-4 w-4 animate-spin rounded-full border-2'
                  role='status'
                ></div>
              ) : (
                'Confirm'
              )}
              {/* Confirm{" "} */}
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  export default AlertPopup
  