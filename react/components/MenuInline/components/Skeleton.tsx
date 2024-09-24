import type { FC } from 'react'
import React from 'react'
import { Container } from 'vtex.store-components'
import { SkeletonPiece } from 'vtex.my-account-commons'

const Skeleton: FC<{ isMobile: boolean }> = ({ isMobile }) => {
  return (
    <Container>
      <div
        className={`c-on-base  h-100 ${
          isMobile
            ? 'flex-column items-start ph6'
            : 'flex flex-row items-center'
        }`}
      >
        <div className={isMobile ? 'mb4 w-80' : 'mr4 w-10'}>
          <SkeletonPiece width={'100'} size={isMobile ? '4' : '3'} />
        </div>
        <div className={isMobile ? 'mb4 w-100' : 'mr4 w-20'}>
          <SkeletonPiece width={'100'} size={isMobile ? '4' : '3'} />
        </div>
        <div className={isMobile ? 'mb4 w-80' : 'mr4 w-10'}>
          <SkeletonPiece width={'100'} size={isMobile ? '4' : '3'} />
        </div>
        <div className={isMobile ? 'mb4 w-100' : 'mr4 w-20'}>
          <SkeletonPiece width={'100'} size={isMobile ? '4' : '3'} />
        </div>
      </div>
    </Container>
  )
}

export default Skeleton
