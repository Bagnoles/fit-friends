import { Entity } from 'src/shared/database/entity';
import { StorableEntity } from 'src/shared/database/storable-entity.interface';
import { Gender } from 'src/shared/types/gender.enum';
import { Subway } from 'src/shared/types/subway.enum';
import { User } from 'src/shared/types/user.interface';
import { compareHash, generateHash } from 'src/shared/utils/hasher';

export class UserEntity extends Entity implements StorableEntity<User> {
  name: string;
  email: string;
  avatarUrl: string;
  passwordHash: string;
  gender: Gender;
  birthday?: Date;
  description: string;
  subway: Subway;
  imageUrl: string;

  constructor(user?: User) {
    super();
    this.populate(user);
  }

  public populate(user?: User): void {
    if (!user) {
      return;
    }

    this.id = user.id ?? undefined;
    this.email = user.email;
    this.name = user.name;
    this.avatarUrl = user.avatarUrl;
    this.passwordHash = user.passwordHash;
    this.gender = user.gender;
    this.birthday = user.birthday;
    this.description = user.description;
    this.subway = user.subway;
    this.imageUrl = user.imageUrl;
  }

  public toPOJO(): User {
    return {
      id: this.id,
      email: this.email,
      passwordHash: this.passwordHash,
      name: this.name,
      avatarUrl: this.avatarUrl,
      gender: this.gender,
      birthday: this.birthday,
      description: this.description,
      subway: this.subway,
      imageUrl: this.imageUrl,
    };
  }

  public async setPassword(password: string) {
    this.passwordHash = await generateHash(password);
    return this;
  }

  public async comparePassword(password: string) {
    return compareHash(password, this.passwordHash);
  }
}
