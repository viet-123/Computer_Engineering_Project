import React from 'react';

function AccountItem({ data }) {
      return (
            <Link to={`/@${data.nickname}`} className={cx('wrapper')}>
                  <Image className={cx('avatar')} src={data.avatar} alt={data.full_name} />
                  <div className={cx('info')}>
                        <h4 className={cx('name')}>
                              <span>{data.full_name}</span>
                              {data.tick && (
                                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                              )}
                        </h4>
                        <span className={cx('username')}>{data.nickname}</span>
                  </div>
            </Link>
      );
}

export default AccountItem;
