import * as React from 'react'
import * as Types from '../../../constants/types/fs'
import * as Constants from '../../../constants/fs'
import * as Flow from '../../../util/flow'
import * as Styles from '../../../styles'
import {rowStyles, StillCommon, StillCommonProps} from './common'
import * as Kb from '../../../common-adapters'
import {LastModifiedLine, Filename} from '../../common'

type StillProps = StillCommonProps & {
  intentIfDownloading?: Types.DownloadIntent | null
  isEmpty: boolean
  type: Types.PathType
  uploadErrorRetry?: () => void
  uploading: boolean
  writingToJournal: boolean
}

const getDownloadingText = (intent: Types.DownloadIntent) => {
  switch (intent) {
    case Types.DownloadIntent.None:
      return 'Downloading ...'
    case Types.DownloadIntent.CameraRoll:
      return 'Saving ...'
    case Types.DownloadIntent.Share:
      return 'Preparing to send to other app ...'
    default:
      Flow.ifFlowComplainsAboutThisFunctionYouHaventHandledAllCasesInASwitch(intent)
      return ''
  }
}

const Still = (props: StillProps) => (
  <StillCommon
    path={props.path}
    onOpen={props.onOpen}
    inDestinationPicker={props.inDestinationPicker}
    writingToJournal={props.writingToJournal}
    badge={props.intentIfDownloading ? Types.NonUploadPathItemBadgeType.Download : undefined}
  >
    <Kb.Box style={Styles.collapseStyles([rowStyles.itemBox, props.writingToJournal && rowStyles.opacity30])}>
      <Kb.Box2 direction="horizontal" fullWidth={true}>
        <Filename
          path={props.path}
          type={Constants.pathTypeToTextType(props.type)}
          style={rowStyles.rowText}
        />
        {props.isEmpty && (
          <Kb.Meta
            title="empty"
            backgroundColor={Styles.globalColors.greyDark}
            style={{marginLeft: Styles.globalMargins.tiny, marginTop: Styles.globalMargins.xxtiny}}
          />
        )}
      </Kb.Box2>
      {props.uploadErrorRetry ? (
        <Kb.Text type="BodySmallError">
          Upload has failed.{' '}
          <Kb.Text type="BodySmallError" onClick={props.uploadErrorRetry} underline={true}>
            Retry
          </Kb.Text>
        </Kb.Text>
      ) : props.intentIfDownloading ? (
        <Kb.Text type="BodySmall">{getDownloadingText(props.intentIfDownloading)}</Kb.Text>
      ) : props.writingToJournal ? (
        <Kb.Meta title="Encrypting" backgroundColor={Styles.globalColors.blue} />
      ) : props.uploading ? (
        <Kb.Text type="BodySmall">Uploading ...</Kb.Text>
      ) : (
        props.type !== Types.PathType.Folder && <LastModifiedLine path={props.path} mode="row" />
      )}
    </Kb.Box>
  </StillCommon>
)

export default Still
